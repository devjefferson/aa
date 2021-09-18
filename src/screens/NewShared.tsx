import React, { useContext, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { DataCategoryProps } from '../hooks/useOcorrence';
import ViewShot, {captureRef} from "react-native-view-shot"
import { ScrollView } from 'react-native-gesture-handler';
import * as Sharing from 'expo-sharing';

import colors from '../constants/colors';
import fonts from '../Styles/fonts';
import FormatDataString from '../utils/FormatDataString';

import { Button } from '../components/Button';
import background from '../image/shot/background.png'
import Admob from '../components/Admob';
import AppContext from '../Provider';

interface DataOcorrence {
  ocorrenceData : DataCategoryProps
}


export default function NewShared() {
  const route = useRoute()
  const viewShot = useRef<any>()
  const { ocorrenceData } = route.params as DataOcorrence

  const { updateShared } = useContext(AppContext)

  async function captureAndShareScreenshot(){
   const imageUrl =  await captureRef(viewShot, {
      format: "jpg",
      quality: 0.8
    })
      let urlString = imageUrl
      let options = {
        dialogTitle: 'Compartilhar Ocorrência',
        mimeType: 'image/jpeg'        
      };

      await Sharing.shareAsync(urlString, options)

      await updateShared(ocorrenceData.id)
  };
  return (
    <View style={styles.container}>
     <View style={{marginVertical: 10}}>
        <Admob id="ca-app-pub-7185818297801314/2423374089" />
     </View>
    <ViewShot
      style={styles.shotContainer}
      ref={viewShot}
      options={{format: "jpg", quality: 0.9}}
    >
      <Image 
        source={background}
        style={styles.image}
      />
      
      <Text style={styles.title}>{ocorrenceData.category == 'residencial' ? "Furto " + ocorrenceData.category : ocorrenceData.category == 'veículo'? "Roubo de " + ocorrenceData.category : ocorrenceData.category == 'arrastao' ? "Arrastão" : ocorrenceData.category }</Text>
      <Text style={styles.region}>{String(ocorrenceData.district ? ocorrenceData.district : ocorrenceData.subregion)}</Text>
      <Text style={styles.street}>{String(ocorrenceData.street ? ocorrenceData.street + " " : '')}</Text>
      <ScrollView style={styles.description}>
        <Text style={styles.descriptionText}>
          {String(!ocorrenceData.detalhes ? "" : ocorrenceData.detalhes)}
        </Text>
      </ScrollView>
      <Text style={styles.date}>
          {FormatDataString(ocorrenceData.dateOcorrence.seconds)}
        </Text>

      <Text style={styles.hastag}>#AlertaAssalto</Text>
      
    </ViewShot>
    <Button 
        onPress={captureAndShareScreenshot}
        title='Compartilhar'
      />
     <View style={{marginVertical: 10}}>
        <Admob id="ca-app-pub-7185818297801314/2423374089" />
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shotContainer:{
    width: 350,
    height: 350,
    backgroundColor: colors.background,
    marginBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  image:{
    width: 350,
    height: 350,
    position: 'absolute',
    opacity: 0.3

  },
  title:{
    top: -5,
    color: colors.segundary,
    fontFamily: fonts.heading,
    fontSize: 32,
  },
    region:{
      top: -28,
      fontFamily: fonts.heading,
      fontSize: 18,
      color: colors.segundary
    },
    street:{
      top: -38,
      fontFamily: fonts.heading,
      fontSize: 12,
      color: colors.segundary
    },
  description:{
    top: -35,
    width: 250,
    backgroundColor: colors.shape,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  descriptionText:{
    fontFamily: fonts.text,
    color: colors.background
    },
  date:{
    marginTop: -32,
    fontFamily: fonts.text,
    color: colors.segundary,
  },
  hastag:{
    //top: ,
    color: colors.segundary,
    fontFamily: fonts.heading
  }
})
