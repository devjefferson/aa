import {  DataCoord } from "IntefaceDefalut";
import { subDays } from "date-fns";
import firebase from '../Services/Firebase'

export interface DataListOccurrence {
  list: DataCategoryProps[]
  lastItemList?: any,
}
export interface DataCategoryProps extends firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>{
  id: string
  city: string | null
  country: string | null
  district: string | null
  isoCountryCode: string | null
  latitude: number
  longitude: number
  name: string | null
  postalCode: string | null
  region: string | null
  street: string | null
  subregion: string | null
  timezone: string | null,
  
// Adicionado pelo usuario
  category?: string | null
  dateOcorrence?: any
  dateRegister?: string | null
  death?: boolean| null
  detalhes?: string| null
  placa?: string| null
  cor?: string| null
  itens?: string | null
  subcategory?: string | null
  type?: string| null
  tag: [],
  shared: number,
  view: number,
  userData: {
    displayName?: string| null
    email: string
    uid: string 
  },
 
}

interface DataView{
  id: string,
  count?: number,
  shared?: number
  route?: string
}
export interface DataGetView{
  view?: number,
  shared? : number

}

export interface DataSetView{
  id: string
  view?: number,
  shared? : number

}

export default function useOcorrence() {

  async function getOcorrencePinMap(day = 2): Promise<DataListOccurrence> { 
    return new Promise((resolve) => {
      const result = firebase.firestore().collection("occurrence");
      
      result.where('dateRegister', '>=', subDays(new Date(), day)).orderBy('dateRegister').get().then(collections => {
        const collection = collections.docs.map((occurrences) =>{
          return Object.assign({}, { id: occurrences.id}, occurrences.data())
        })
        return resolve({
          list: collection as DataCategoryProps[],
          lastItemList: collections.docs[collections.docs.length - 1]
        })
      })
    })
  }

  async function getCountViewer(id: string):  Promise<DataGetView>{
    const result = await firebase.database().ref('countStar/' + id).get()

    return result.val()

  }


  async function setCountViewer({id, view }: DataSetView):  Promise<void>{

    }

  async function getOcorrenceUser(uuid: string): Promise<DataListOccurrence> {
    return new Promise((resolve, reject) => {
      const result = firebase.firestore().collection("occurrence");
      result.where('userData.uid', '==', uuid).limit(10).get().then(collections => {
  
        const collection = collections.docs.map((occurrences) => Object.assign({}, { id: occurrences.id }, occurrences.data()))
        resolve({
          list: collection as DataCategoryProps[],
          lastItemList: collections.docs[collections.docs.length - 1]
        })
      })
    })
  }

    
  async function getListUserUpdate(lastItem: any, uuid: string): Promise<DataListOccurrence> {
    return new Promise((resolve) => {
      const result = firebase.firestore().collection("occurrence");
      result.where('userData.uid', '==', uuid).startAfter(lastItem).limit(10).get().then(collections => {
  
        const collection = collections.docs.map((occurrences) => Object.assign({}, { id: occurrences.id }, occurrences.data())) as DataCategoryProps[]
  
        return resolve({
          list: collection,
          lastItemList: collections.docs[collections.docs.length - 1]
        })
  
      })
    })
  }

  async function getListSearchUpdate(lastItem: any, params: string): Promise<DataListOccurrence> {
    return new Promise((resolve) => {
      const result = firebase.firestore().collection("occurrence");
      result.where('tag', 'array-contains', params).startAfter(lastItem).limit(10).get().then(collections => {
        
        const collection = collections.docs.map((occurrences) => {

          return Object.assign({}, { id: occurrences.id }, occurrences.data())
        
        }) as DataCategoryProps[]
        
        return resolve({
          list: collection,
          lastItemList: collections.docs[collections.docs.length - 1]
        })
  
      })
    })
  }

  async function getListSearch( params: string | undefined): Promise<DataListOccurrence> {
    return new Promise((resolve, reject) => {
      try {
        const result = firebase.firestore().collection("occurrence");
        result.where('tag', 'array-contains', params).limit(10).get().then(collections => {
    
          const collection = collections.docs.map((occurrences) => Object.assign({}, { id: occurrences.id }, occurrences.data())) as DataCategoryProps[]
          
          console.log(collection)
          return resolve({
            list: collection,
            lastItemList: collections.docs[collections.docs.length - 1]
          })
    
        })
      } catch (error) {
        reject(error)
      }
     
    })
  }

  async function getListOccurrence(): Promise<DataListOccurrence> {
    return new Promise((resolve, reject) => {
      const result = firebase.firestore().collection("occurrence");
      result.orderBy('dateRegister', 'desc').limit(10).get().then(collections => {
  
        const collection = collections.docs.map((occurrences) => {        
          return Object.assign({}, { id: occurrences.id }, occurrences.data())
        })
        resolve({
          list: collection as DataCategoryProps[],
          lastItemList: collections.docs[collections.docs.length - 1]
        })
      })
    })
  }

  
  
  async function getListUpdate(lastDocs: any): Promise<DataListOccurrence> {
    return new Promise((resolve) => {
      const result = firebase.firestore().collection("occurrence");
      result.orderBy('dateRegister', 'desc').startAfter(lastDocs).limit(5).get().then(collections => {
  
        const collection = collections.docs.map((occurrences) => Object.assign({}, { id: occurrences.id }, occurrences.data())) as DataCategoryProps[]
  
        return resolve({
          list: collection,
          lastItemList: collections.docs[collections.docs.length - 1]
        })
  
      })
    })
  }

  async function deleteOcorrenceUser(id: string){
    const query = firebase.firestore().collection('occurrence');
    await query.doc(id).delete() 
  }

  async function updateView(id: string){
    const query = firebase.firestore().collection('occurrence');
    await query.doc(id).update("view", firebase.firestore.FieldValue.increment(1))
  }

  async function updateShared(id: string){
    const query = firebase.firestore().collection('occurrence');
    await query.doc(id).update("shared", firebase.firestore.FieldValue.increment(1))
  }

  async function setOcorrence(data: DataCategoryProps) {
    const cityRef = firebase.firestore().collection("occurrence").doc();

    await firebase.firestore().collection('filtered').doc('options').update({
      regions: firebase.firestore.FieldValue.arrayUnion(data.district? data.district : data.subregion),
      category: firebase.firestore.FieldValue.arrayUnion(data.category),
      city: firebase.firestore.FieldValue.arrayUnion(data.region)

    })

    return await cityRef.set(data);
  }

 
  return { setOcorrence,getListSearch, getListSearchUpdate, getListOccurrence, getListUpdate, getOcorrencePinMap, getOcorrenceUser,getListUserUpdate,updateView,updateShared, deleteOcorrenceUser }
}