import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useManegerAsyncStorage() {
  const [error, setError] = useState<string>()
  const [userLocal, setUserLocal] = useState<boolean>(false)

  useEffect(()=>{
    getUsernameStarted()
    return ()=>{
      new AbortController().abort()
    }
  },[])

  async function getUsernameStarted() {
    const username = await AsyncStorage.getItem("@SBAuth:username")
    if(username){
      setUserLocal(true)
    } 
  }

  async function UserAthencated() {
    await AsyncStorage.removeItem("@SBAuth:username")
  }

  async function setUsernameStarted(UserName: string) {
    try {
      await AsyncStorage.setItem("@SBAuth:username", UserName)
    } catch (error) {
    }
  }



  return { getUsernameStarted, setUsernameStarted,userLocal, error }
}