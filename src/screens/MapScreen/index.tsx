import React, { useContext, useEffect, useRef, useState } from "react";
import StylesCustomMap from "../../utils/StyleCustomMap"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import {Picker} from '@react-native-picker/picker'
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import MapView from "react-native-map-clustering"
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/core";
import AppContext from "../../Provider";
import { DataCoord } from "IntefaceDefalut";
import { Load } from "../../components/Loads";

import add from '../../image/add.png'
import reload from '../../image/reload.png'
import colors from "../../Styles/colors";
import ImagePin from "../../utils/ImagePin";
import fonts from "../../Styles/fonts";
import { DataCategoryProps } from "../../hooks/useOcorrence";


const MapScreen: React.FC = () => {
  const { signed, getOcorrencePinMap, getLocationAsync, RequestPermissionLocation, userLocal} = useContext(
    AppContext
  );
  const mounted = useRef(false);
  const navigation = useNavigation();
  const [regionInitial, setRegionInitial] = useState<DataCoord>();
  const [regionNew, setRegionNew] = useState<DataCoord>();

  const [list, setList] = useState<DataCategoryProps[]>();
  const [filterdDay, setFilterdDay] = useState<number | any>();


useEffect(()=>{
  getLocationAsync().then(data=> {
    setRegionInitial(data);
  }) 
  return ()=> {
    new AbortController().abort()
  }
},[userLocal])

useEffect(()=>{
  setListFull(7);
  return ()=> {
    new AbortController().abort()
  }
},[])



  function handleCreatedOcorrence() {
    if(!signed){
      navigation.navigate('Login')
    }else{
      navigation.navigate("CreatedOcorrence");
    }
  }
  function setListFull(day = 7) {
    setFilterdDay(day)
    setList([])
    getOcorrencePinMap(Number(day)).then((data)=>{
      setList(data.list)
    })
    
    } 

  function handleDetails(data: DataCategoryProps){
    navigation.navigate("DetailsOcorrenceList", { ocorrenceData: data })
  }

  if (!regionInitial || !list) {
    return <Load/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerBody}>
        <View style={styles.containerMap}>
      
          <MapView
            clusterColor={colors.segundary}
            style={styles.map}
            
            customMapStyle={StylesCustomMap}
            initialRegion={{
              latitude: regionInitial.latitude,
              longitude: regionInitial.longitude,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            }}
            
          >
            {list.map((items: DataCategoryProps | any) => {
              return (
                <Marker
                  key={items.id}
                  coordinate={{
                    latitude: items.latitude,
                    longitude: items.longitude,
                  }}
                  image={ImagePin(items.subcategory ? items.subcategory  :  items.category)}
                  style={{width: 50, height: 50}}
                  onPress={() => handleDetails(items)}
                >             
                </Marker>
              );
            })}
            
          </MapView>
          
          <View  style={styles.picker} >
          <Picker style={styles.pickerText} selectedValue={filterdDay} onValueChange={(itemValue, itemIndex)=>setListFull(itemValue)}>
              <Picker.Item value={1} label="Últimas 24 Horas"/>              
              <Picker.Item value={3} label="Últimos 3 Dias"/>
              <Picker.Item value={7} label="Últimos 7 Dias"/>
              <Picker.Item value={15} label="Últimos 15 Dias"/>
              <Picker.Item value={30} label="Últimos 30 Dias"/>
          </Picker>
          <View style={styles.autocompleteContainer}>
            </View>
          </View>
          

          <TouchableOpacity style={styles.buttonAdd} onPress={handleCreatedOcorrence}>
            <Image source={add} style={styles.buttonImageAdd}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonReload} onPress={()=>setListFull(filterdDay)}>
          <Image source={reload} style={styles.buttonImage}/>          
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242f3e",
  },
  Loads: { 
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  containerBody: {
    flex: 3.5,
    margin: 4,
  },
  containerMap: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 10,
    overflow: "hidden",
  },
  
  calloutContainer: {
    width: 200,
    marginLeft: 50,
    marginBottom: 20,
    paddingTop: 5,
    height: 80,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
    elevation: 2,
  },
  calloutText: {
    color:colors.background,
    fontFamily: fonts.text,
    fontSize: 14
  },

  buttonReload:{
    width: 50,
    height: 50,
   // backgroundColor: colors.segundary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 20, 
  },
  buttonImageAdd:{
    width:55.72,
    height:60,
  },
  buttonImage:{
    width:39.84,
    height:60,
  },
  buttonAdd: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  buttonAddText: {
    fontSize: 30,
    color: "#FFF",
  },
  picker:{
    width: 200,
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 100,
    
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: colors.segundary
    
  },
  pickerText:{
    color: colors.segundary,
    paddingBottom: -20,
    marginBottom: -10,
    fontFamily: fonts.heading,
    fontSize: 20
  
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 150, 
    zIndex: 1
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
