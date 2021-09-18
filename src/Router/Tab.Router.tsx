import React, { useContext } from "react";
import { View, Image, ImageSourcePropType, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen";
import { ListFiltedOcorrence } from "../screens/ListFiltedOcorrence";
import imageIcon from "../image/index";
import {Profile} from "../screens/Profile";
import AppContext from "../Provider";
import fonts from "../Styles/fonts";
import colors from "../Styles/colors";
import HelpPag from "../screens/Help";

// import { Container } from './styles';
const Tab = createBottomTabNavigator();

const TabRouter: React.FC = () => {

  const { signed } = useContext(AppContext)

  function renderImage(
    focused: boolean,
    active: ImageSourcePropType,
    inative: ImageSourcePropType
  ) {
    return (
      <Image
        source={focused ? active : inative}
        style={styles.containerImage}
      />
    );
  }
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: "#242f3e",
          borderTopColor: "#242f3e",
          alignItems: "center",
          justifyContent: "center",
          height: 56,
        },
        labelStyle: {
          fontSize: 14,
          fontFamily: fonts.text
        },
        activeTintColor: colors.segundary,
        inactiveTintColor: "white",
        tabStyle: {
          justifyContent: "center",
        },
      }}
    >
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return renderImage(focused, imageIcon.gunsactive, imageIcon.guns);
          },
          tabBarBadgeStyle: {
            fontSize: 28,
          },
          tabBarLabel: "Mapa",
        }}
      />
      <Tab.Screen
        name="Lista"
        component={ListFiltedOcorrence}
        options={{
          tabBarIcon: ({ focused }) => {
            return renderImage(
              focused,
              imageIcon.settingactive,
              imageIcon.setting
            );
          },
        }}
      />

     {
       signed ? <Tab.Screen
        name="Perfil"
        component={Profile}
        
        options={{
          
          tabBarIcon: ({ focused }) => {
            return renderImage(
              focused,
              imageIcon.profileactive,
              imageIcon.profile
            );
          },
        }}
      /> : null
     }
     <Tab.Screen
        name="Help"
        component={HelpPag}
        options={{
          tabBarIcon: ({ focused }) => {
            return renderImage(focused, imageIcon.helpActive, imageIcon.help);
          },
          tabBarBadgeStyle: {
            fontSize: 28,
          },
          tabBarLabel: "Ajuda",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  containerImage:{
    maxHeight: 22,
    maxWidth: 22,
    marginTop: 4,
  }
})

export default TabRouter;
