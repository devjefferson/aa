import { DataLocation } from 'IntefaceDefalut';
import { DataCoord } from 'IntefaceDefalut';
import { subDays } from 'date-fns';
import { DataCategoryProps, DataFiltered } from 'IntefaceDefalut';
import firebase from '../Services/Firebase'

interface DataListOccurrence {
  list: DataCategoryProps[]
  lastItemList: any
}


export async function ListOccurrence(): Promise<DataListOccurrence> {
  return new Promise((resolve, reject) => {
    const result = firebase.firestore().collection("occurrence");
    result.orderBy('dateRegister', 'desc').limit(5).get().then(collections => {

      const collection = collections.docs.map((occurrences) => Object.assign({}, { id: occurrences.id }, occurrences.data()))
      resolve({
        list: collection as DataCategoryProps[],
        lastItemList: collections.docs[collections.docs.length - 1]
      })
    })
  })
}

export async function ListFiltered(): Promise<DataFiltered> {
  return new Promise((resolve, reject) => {
    const result = firebase.firestore().collection("filtered").doc('options');
    result.get().then(collections => {

      resolve(collections.data() as DataFiltered)
    })
  })
}





