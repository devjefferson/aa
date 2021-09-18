declare module 'IntefaceDefalut'{
export interface DataCoord{
  latitude: number
  longitude: number
}

export interface DataLocation extends DataCoord{
  city: string | null;
  country: string | null;
  district: string | null;
  isoCountryCode: string | null;
  name: string | null;
  postalCode: string | null;
  region: string | null;
  street: string | null;
  subregion: string | null;
  timezone: string | null;
}


export interface DataFiltered{
  categoty: string[]
  city: string[]
  regions: string[]
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
  geohash: string,
  
// Adicionado pelo usuario
  category?: string | null
  dateOcorrence?:{
    nanoseconds: number
    seconds: number
  }
  dateRegister?: {
    nanoseconds: number
    seconds: number
  } 
  death?: boolean| null
  detalhes?: string| null
  placa?: string| null
  cor?: string| null
  itens?: string | null
  subcategory?: string | null
  type?: string| null
  userData: {
    displayName?: string| null
    email: string
    uid: string 
  },
 
}

export interface DataSubmitProps extends DataCategoryProps{
  death: boolean,
  detalhes: string
  userData: {
    displayName: string | null
    email: string
    uid: string 
  },
}

}