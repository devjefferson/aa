import React, { useContext, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../Styles/colors';
import fonts from '../Styles/fonts';
import FormatDataString from '../utils/FormatDataString';

import { Button, ButtonFloat } from '../components/Button';
import Admob from '../components/Admob';
import { DataCategoryProps } from '../hooks/useOcorrence';
import AppContext from '../Provider';

interface DataOcorrence {
  ocorrenceData : DataCategoryProps
}

export function DetailsOcorrenceList(){
const route = useRoute()
const navigation = useNavigation()
const {updateView} = useContext(AppContext)
const { ocorrenceData } = route.params as DataOcorrence

useEffect(()=>{
  (async()=>{
    await updateView(ocorrenceData.id)
  })()

  return ()=>{
    new AbortController().abort()
  }
},[])




  function handleGoBack(){
    navigation.goBack()
  }

  function handleShared(){
    navigation.navigate("NewShared", {ocorrenceData});
  }


  function selectCategory(){
    if(ocorrenceData.category == 'furto' || 'veiculo'){
      
    }
  }

  

  if(!ocorrenceData){
    return <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}><Text> Load </Text></View>
  }
  return (
    <View style={styles.container}>
    <ScrollView>
    <View style={[styles.container,{ marginBottom: 50}]}>
       <Image source={{uri: `https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/pin-l-embassy+D59563(${ocorrenceData.longitude},${ocorrenceData.latitude})/${ocorrenceData.longitude},${ocorrenceData.latitude},17/600x600?access_token=pk.eyJ1IjoibmRpZXN1cGVyIiwiYSI6ImNrbnV1cnllMzBhdzUydnBlazd1bGhjZzQifQ.lhPXMZCOVouJ9psnJ-RWdw`}} style={styles.image}/>
        
        <Text style={styles.title} >
        {ocorrenceData.category == 'residencial' ? "Furto " + ocorrenceData.category : ocorrenceData.category == 'veículo'? "Roubo de " + ocorrenceData.category : ocorrenceData.category == 'arrastao' ? "Arrastão" : ocorrenceData.category }
        </Text>
        <Text style={styles.subTitle} >
         {
          FormatDataString(ocorrenceData.dateOcorrence.seconds)
         }
        </Text>
        <ScrollView style={styles.flag} showsVerticalScrollIndicator={false}>
        <Text style={styles.flagText}numberOfLines={10}>
          {ocorrenceData.detalhes}
        </Text>
        </ScrollView>
       
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes da Ocorrência.</Text>
          <Text style={styles.cardText}>{ocorrenceData.street ? ocorrenceData.street : ocorrenceData.name}</Text>
          <Text style={styles.cardText}>Bairro: {' '}{ocorrenceData.district}</Text>
          <Text style={styles.cardText}>Cidade: {' '}{ocorrenceData.subregion? ocorrenceData.subregion :ocorrenceData.region}</Text>
          
          {
           ocorrenceData.category == 'veiculo' ? (
             <>
             <Text style={styles.cardText}>Tipo de Veiculo: {' '}{ocorrenceData.subcategory? ocorrenceData.subcategory: "não informado"}</Text>
             <Text style={styles.cardText}>Placa: {' '}{ocorrenceData.placa? ocorrenceData.placa: "não informado"}</Text>
            <Text style={styles.cardText}>Cor: {' '}{ocorrenceData.cor? ocorrenceData.cor : "não informado"}</Text>
             </>
           ) : <></>
          }

          
        </View>
        <TouchableOpacity onPress={handleShared} style={styles.buttonShared}>
          <Text style={styles.buttonSharedText}>Compartilhar</Text>
        </TouchableOpacity>
        <ScrollView style={styles.anuncio}>
          <Admob
            id="ca-app-pub-7185818297801314/7173137884"
          />
       </ScrollView>
       
       
    </View>
    </ScrollView>
    <View style={styles.button}>
         <ButtonFloat onPress={handleGoBack} title='Voltar'/>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    height: Dimensions.get('window').height + 60,
  },
  image:{
    width: Dimensions.get('window').width,
    height: 270,
  },
  buttonShared:{
    //bottom: 230,
    left: 90
  },
  buttonSharedText:{
    fontFamily: fonts.text,
    fontSize: 18,
    lineHeight: 40,
    color: colors.segundary,
  },
  title:{
    bottom: 140,
    fontSize: 32,
    lineHeight: 40,
    fontFamily: fonts.heading,
    textTransform: "capitalize",
    color: colors.segundary,
  },
    subTitle:{
    bottom: 140,
    color: colors.white,
    fontFamily: fonts.text,
    lineHeight: 28,
    fontSize: 18,
  },  
  flag:{
    width: Dimensions.get('window').width - 40,
    maxHeight: 140,
    minHeight: 100,
    backgroundColor: colors.body_light,
    marginTop: -130,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  flagText:{
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 14,
    width: 295,
    paddingVertical: 10
  },
  card:{
    width: Dimensions.get('window').width - 40,
    backgroundColor: colors.body_light,
    borderColor: colors.heading,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  cardTitle:{
    color: colors.segundary,
    fontSize: 16,
    fontFamily: fonts.heading,

  },
  cardLabel:{
    color: colors.segundary,
    fontFamily: fonts.text 
  },
  cardText:{
    color: colors.heading,
    fontFamily: fonts.heading
  },
  anuncio:{
    //alignItems: 'center',
    //justifyContent: 'center',
    marginVertical: 10,
  },
  button:{
    position: 'absolute',
    bottom: 1
  }

})
