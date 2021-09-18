import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { AppProvider } from "./src/Provider";
import Router from "./src/Router";
import colors from "./src/Styles/colors";
import usePermissions from './src/hooks/usePermissions'
import useNotification from "./src/hooks/useNotification";



export default function App() {
  const { RequestPermissionLocation } = usePermissions()
  const { requestNotificationUserPermission } = useNotification()
 
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

 

  useEffect(()=>{
    RequestPermissionLocation()
    requestNotificationUserPermission()
    return ()=>{
      new AbortController().abort()
    }
  },[])


  if (!fontsLoaded) {
    return null;
  }
  return (
    <AppProvider>
      <StatusBar style="light" backgroundColor={colors.background}  />
      <Router />      
    </AppProvider>
  );
}