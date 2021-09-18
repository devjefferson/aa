import firebase from 'firebase';
import 'firebase/firestore'
import "firebase/firebase-auth";
import 'firebase/auth'
import 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyCIJUsebwGTzJUD3UDb3IUEdX12_2nEHu8",
  authDomain: "alertaassalto-3a39d.firebaseapp.com",
  databaseURL: "https://alertaassalto-3a39d-default-rtdb.firebaseio.com",
  projectId: "alertaassalto-3a39d",
  storageBucket: "alertaassalto-3a39d.appspot.com",
  messagingSenderId: "554762222895",
  appId: "1:554762222895:web:8487cabeae503d49e1f5da",
  measurementId: "G-9HM63YPLDS"
}

if(!firebase.apps.length){
  try {
   firebase.initializeApp(firebaseConfig)
  } catch (error) {
    console.log({mensage: error})
  }
}


export default firebase