import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { MapEvent, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/core";
import {  DataLocation } from "IntefaceDefalut";
import StylesCustomMap from "../../utils/StyleCustomMap";
import AppContext from "../../Provider";
import colors from "../../Styles/colors";
import { Load } from "../../components/Loads";
import { Button, ButtonFloat } from '../../components/Button'
import fonts from "../../Styles/fonts";
import { DataInitial } from "../../hooks/usePermissions";
import search from '../../image/search.png'
import { TextInput } from "react-native-gesture-handler";
 
const CreatedOcorrence: React.FC = () => {
  const navigation = useNavigation();
  const { signed, RequestPermissionLocation, getLocationAsync} = useContext(AppContext);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  } as DataInitial);
  const [regionInitial, setRegionInitial] = useState<DataInitial>();
  const [regionNew, setRegionNew] = useState<string>();
  const [error, setError] = useState("");
  const [locationData, setLocationData] = useState<DataLocation>();

  useEffect(() => {
    getLocationAsync().then(data=> {
      setRegionInitial(data);
    })

    return () => {
      new AbortController().abort()
    }
  },[]);

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
    getLocation(event.nativeEvent.coordinate).then(
      (data: Location.LocationGeocodedAddress[]) => {
        setLocationData(data[0] as DataLocation);
      }
    );
  }

  async function getLocation(data: any) {
    return await Location.reverseGeocodeAsync(data);
  }

  function NexpMapPosition() {
    
    if (position.latitude === 0 && locationData != undefined || null) {
      setError("Selecione um ponto no mapa");
      return
    }
    if(position.latitude == 0){
      setError("Selecione novamente um ponto no map");
      return
    }
    
    navigation.navigate("SelectedCategory", { position, data: locationData });
  }

  async function searchLocation(){
    const result = await Location.geocodeAsync(regionNew as string)
    const { latitude, longitude } = result[0]
  
    setRegionInitial({latitude, longitude})
    setPosition({latitude, longitude})
    
    getLocation({latitude, longitude}).then(
      (data: Location.LocationGeocodedAddress[]) => {
        setLocationData(data[0] as DataLocation);
      }
    );
  }
  if (!signed) {
    navigation.navigate("Login");
  }
  if (!regionInitial) {
    return <Load />;
  }
  return (
    <View style={styles.containerMap}>
       {error ? (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View style={styles.indicator}>
        <Text style={styles.indicatorText}>Indique o Local da Ocorrência.</Text>
        </View>
      )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setRegionNew}
          />
          <ButtonFloat 
            icon={search}
            onPress={searchLocation}
            w={50}
            h={40}
          />
        </View>
      <MapView
        style={styles.map}
        customMapStyle={StylesCustomMap}
        region={{
          latitude: regionInitial.latitude,
          longitude: regionInitial.longitude,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421,
        }}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            pinColor={colors.segundary}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      <View style={styles.buttonAdd} >
        <Button title="Próximo" onPress={NexpMapPosition}/>
      </View>
     
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    backgroundColor: colors.red,
    position: "absolute",
    paddingHorizontal: 20,
    width: Dimensions.get('window').width - 40,
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 50,
    zIndex: 1,
  },
  errorText: {
    zIndex: 10,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.heading,
  },
  inputContainer:{
    position: "absolute",
    paddingHorizontal: 20,
    width: Dimensions.get('window').width - 40,
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 80,
    zIndex: 1,
    flexDirection: 'row'
  },
  input:{
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.background
  },
  indicator: {
    position: "absolute",
    zIndex: 1,
    width: Dimensions.get('window').width - 40,
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 50,
  },
  indicatorText: {
    zIndex: 10,
    textAlign: 'center',
    fontFamily: fonts.heading,
    color: colors.white,
  },
  containerBody: {
    flex: 3.5,
    margin: 4,
  },
  containerMap: {
    flex: 1,
    shadowColor: colors.background,
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
  buttonAdd: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 30,
    bottom: 20,
  
  },
  buttonAddText: {
    fontSize: 20,
    color: "#FFF",
  },
  map: {
    flex: 1,
  },
});

export default CreatedOcorrence;
