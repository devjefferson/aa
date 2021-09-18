import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppContext from "../Provider";

import { Confirmation } from "../screens/Confirmation";
import { UserIdentification } from "../screens/UserIdentification";
import { Welcome } from "../screens/Welcome";

import StackRoutes from "./Stack.router";
import TabRouter from "./Tab.Router";
import { LoginUp } from "../screens/Login";
import { DetailsOcorrenceList } from "../screens/DetailsOcorrenceList";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewShared from "../screens/NewShared";
import Help from "../screens/Help";
import Politica from "../screens/Politica";

const Stack = createStackNavigator();

const Router: React.FC = () => {
  const [unmounted, setUnmounted] = useState(false)
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
    LogBox.ignoreLogs(["Setting a timer"]);
    verificad()
    return () => {      
      setUnmounted(true)  
    } 
  }, [])

  async function verificad() {
    const user = await AsyncStorage.getItem("@SBAuth:username");
    !user && setSigned(true);
  }

  if(signed){
  return(
  
     <NavigationContainer>
     <Stack.Navigator
       screenOptions={{
         headerShown: false,
       }}
     >

       <Stack.Screen name="Welcome" component={Welcome} />

       <Stack.Screen
         name="UserIdentification"
         component={UserIdentification}
       />
       <Stack.Screen name="Confirmation" component={Confirmation} />
       <Stack.Screen name="HomeStack" component={TabRouter} />
       <Stack.Screen name="Help"  component={Help}/>
       <Stack.Screen name="Login" component={LoginUp} />
       <Stack.Screen name="DetailsOcorrenceList" component={DetailsOcorrenceList} />
       <Stack.Screen name="NewShared" component={NewShared} />
       <Stack.Screen name="Politica" component={Politica} />
     </Stack.Navigator>
   </NavigationContainer>

  )} else{
    return (
      <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )}
};

export default Router;
