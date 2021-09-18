import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import firebase from '../Services/Firebase'

export interface DataUserSigned{
  displayName: string | any
  email: string | any
  uid: string | any
}

export interface DataUserProps {
  name: string
  email: string
  password: string
}

export interface DataUserSignedProps {
  displayName: string | any
  email: string | any
  uid: string | any
}
export interface DataSignIn {
  data?: DataUserSignedProps | null,
  error?: string | null
}


export default function useAuth() {
  const [userData, setUserData] = useState<DataUserSigned | undefined>();
  const [getToken, setGetToken] = useState<string>();

  useEffect(() => {
    checkUserStorage()
    return ()=>{
      new AbortController().abort()
    }
  }, [])

  async function checkUserStorage() {
    const User = await AsyncStorage.getItem("@SBAuth:user");  
      if (!User) {
        return
      }
      setUserData(JSON.parse(User))
   
  }
;
  async function signUp(data: DataUserProps): Promise<firebase.User>{
    const result = (await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)).user
    await result?.updateProfile({
      displayName: data.name
    })
    await result?.sendEmailVerification()
    setUserData({
      email: result?.email,
      uid: result?.uid,
      displayName: result?.displayName
    });

    AsyncStorage.setItem(
      "@SBAuth:user",
      JSON.stringify({
        email: result?.email,
        uid: result?.uid,
        displayName: result?.displayName
      })
    )
    return result as firebase.User

  }

;
  async function SignIn(email: string, password: string){
    const result = firebase.auth().signInWithEmailAndPassword(email, password).then((response :firebase.auth.UserCredential)=>{
      setUserData({
        email: response.user?.email,
        uid: response.user?.uid,
        displayName: response.user?.displayName
      });

      AsyncStorage.setItem(
        "@SBAuth:user",
        JSON.stringify({
          email: response.user?.email,
          uid: response.user?.uid,
          displayName : response.user?.displayName,
        })
      );
    });

    return result
  
  }

  async function SignOut() {
    AsyncStorage.multiRemove(["@SBAuth:user"]).then(() => {
      setUserData(undefined)
    })
  }

  async function recuverPassword(email: string) {
    const result = await firebase.auth().sendPasswordResetEmail(email)

    return result


  }



  return { SignIn, SignOut, checkUserStorage, userData, signUp, recuverPassword, getToken }
}