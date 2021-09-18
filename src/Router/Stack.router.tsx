import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import AppContext from '../Provider';
import AlertData from '../screens/CreatedOcorrence/AlertData';
import CreatedOcorrence from '../screens/CreatedOcorrence';
import { LoginUp } from '../screens/Login';
import Register from '../screens/Register';
import Recuver from '../screens/Recuver';
import TabRouter from './Tab.Router';
import { SelectedCategory } from '../screens/CreatedOcorrence/SelectedCategory';
import { DetailsOcorrenceList } from '../screens/DetailsOcorrenceList';
import NewShared from '../screens/NewShared';
import Help from '../screens/Help';
import Politica from '../screens/Politica';


const Stack = createStackNavigator()

const Auth: React.FC = () => {

  const { signed } = useContext(AppContext)
 
  return(
    <> 
      {!signed ? <Stack.Navigator  screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen name="HomeStack" component={TabRouter}/>
        <Stack.Screen name="DetailsOcorrenceList" component={DetailsOcorrenceList} />
        <Stack.Screen name="NewShared" component={NewShared} />
        <Stack.Screen name="Login"  component={LoginUp}/>
        <Stack.Screen name="Help"  component={Help}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Recuver" component={Recuver}/>
        <Stack.Screen name="CreatedOcorrence" component={CreatedOcorrence} />
        <Stack.Screen name="Politica" component={Politica} />

      </Stack.Navigator>  : (
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="HomeStack" component={TabRouter} />
          <Stack.Screen name="Help"  component={Help}/>
          <Stack.Screen name="DetailsOcorrenceList" component={DetailsOcorrenceList} />
          <Stack.Screen name="NewShared" component={NewShared} />
          <Stack.Screen name="CreatedOcorrence" component={CreatedOcorrence} />
          <Stack.Screen name="SelectedCategory" component={SelectedCategory} />
          <Stack.Screen name="AlertData" component={AlertData} />
          <Stack.Screen name="Politica" component={Politica} />

        </Stack.Navigator>
      )}
    </>
  );
}

export default Auth