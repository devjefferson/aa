import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Alert, Animated, Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {RectButton, RectButtonProperties} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Trash from '../image/profile/trash.png'

import colors from '../Styles/colors';
import fonts from '../Styles/fonts';
import FormatDataString from '../utils/FormatDataString';
import Admob from './Admob';
import { DataCategoryProps } from '../hooks/useOcorrence';
import viewImage from '../image/cards/view.png'
import sharedImage from '../image/cards/shared.png'

interface CardOcorrenceProps extends RectButtonProperties{
  data: DataCategoryProps,
  index: number,
  deleteOcorrence(): void
  onClick(): void
}

export function CardOcorrenceSegundary({data, index, deleteOcorrence, onClick, ...rest}: CardOcorrenceProps){

  function handleDelete(params: DataCategoryProps){
    Alert.alert("Remover", `Deseja remover a esse ${params.category == 'residencial'? 'Furto ' + params.category : params.category == 'veiculo'? 'Roubo de '+ params.category : params.category}`, [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async function () {
          try {            
            deleteOcorrence()
            
          } catch (error) {

            Alert.alert('Não foi possivel Remover!')
          }
        },
      },
    ])
    
  }

  return(
    <>
    {index % 8 == 0 ? <View style={styles.ads}><Admob 
      id={"ca-app-pub-7185818297801314/9092724216"}
    /></View> : <></>}
    <Swipeable
    overshootRight={false}
    renderRightActions={()=>(
      <Animated.View>
        <View>
          <RectButton
            style={styles.buttonRemove}
            onPress={()=>handleDelete(data)}
            {...rest}
            >
            <Image source={Trash} style={styles.imageTrash}/>
          </RectButton>
        </View>
      </Animated.View>
    )}
    >
    <RectButton 
    {...rest}
    style={styles.buttonContainer}
    >

      <Image source={{uri: `https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/pin-s-l+000(${data.longitude},${data.latitude})/${data.longitude},${data.latitude},14/500x300?access_token=pk.eyJ1IjoibmRpZXN1cGVyIiwiYSI6ImNrbnV1cnllMzBhdzUydnBlazd1bGhjZzQifQ.lhPXMZCOVouJ9psnJ-RWdw`}} style={styles.image}/>
      
      <View style={styles.content}>
      <Text style={styles.type}>
          Tipo de ocorrência.
        </Text>
        <Text style={styles.title}>
          {data.category == 'residencial'? "Furto " + data.category :data.category == 'veiculo'? "Roubo de Veículo": data.category == "arrastao" ? "Arrastão" : data.category }
        </Text>
        
        <View style={styles.viewStreet}>
            <Text style={styles.type}>
              Localização da ocorrência
            </Text>
            <Text style={styles.street} numberOfLines={1}>
              {data.street? data.street : data.name}
            </Text>
            <Text style={styles.street} numberOfLines={1}>
              Bairro: {data.district}
            </Text>
        </View>

        <View>
            <Text style={styles.typeData}>
              Data da ocorrência
            </Text>
            <Text style={styles.data} numberOfLines={1}>
              {
                FormatDataString(data.dateOcorrence.seconds)
              }
            </Text>
        </View>

        <View style={styles.socialFooter}>
          <View style={styles.socialContent}>
            <Image  source={viewImage} style={styles.socialImage}/>
            <Text style={styles.socialText}>{data.view? data.view : 0}</Text>
          </View>
          <View style={styles.socialContent}>
            <Image  source={sharedImage} style={styles.socialImage}/>
            <Text style={styles.socialText}>{data.shared? data.shared : 0}</Text>
          </View>
        </View>

      </View>
    </RectButton>
    </Swipeable>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer:{
    flex: 1,
      backgroundColor: colors.shape,
      width: Dimensions.get('window').width - 10,
      minHeight: 158.8,
      maxHeight: 250,
      marginVertical: 5,
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      borderRadius: 12,
      shadowRadius: 12,
      shadowColor: colors.heading,
      shadowOpacity: 0.028,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      elevation: 1,
  },
    ads:{
     // width: Dimensions.get('window').width - 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 3
    },
    image:{
      resizeMode: 'cover',
      width: 139.84,
      minHeight: 158.8,
      maxHeight: 250,
      borderTopLeftRadius:12,
      borderBottomLeftRadius:12
    },
    content:{
      paddingVertical: 5,
      paddingHorizontal: 10,
      flex: 1
    },
    type:{
      color: colors.heading,
      fontFamily: fonts.text,
      fontSize: 12
    },
    title:{
      lineHeight: 20,
      color: colors.segundary,
      fontSize: 18,
      fontFamily: fonts.heading,
      textTransform: 'capitalize',
      //marginBottom: 5
    },
    viewStreet:{
  
      marginVertical: 5,
      marginBottom: 5
    },
    street:{
      color: colors.heading,
      fontFamily: fonts.light,
      fontSize: 12,
      lineHeight: 14,
    },
    typeData:{
      color: colors.heading,
      fontFamily: fonts.text,
      fontSize: 12,
      lineHeight: 14,
    },
    data:{
      color: colors.heading,
      fontFamily: fonts.light,
      fontSize: 12,
      lineHeight: 14,
    },
    socialFooter:{
      flex: 1,
      borderTopWidth: 1,
      borderTopColor: "#dfdfdf",
      height: 32,
      marginRight: 5,
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'flex-end'
      
    },
    socialContent:{
      flexDirection: 'row',
      marginHorizontal: 5
      
    },
    socialImage:{
      marginRight: 5,
      width: 18,
      height: 18,
      resizeMode: 'contain'
  
    },
    socialText:{
      fontSize: 12,
      fontFamily: fonts.light,
      color: colors.gray
    },
  buttonRemove:{
    width: 150,
    height: 130,
    backgroundColor: colors.red,
    marginTop: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    right: 30,
    paddingLeft: 15,
  },
  imageTrash:{
    height: 40,
    width: 28.58
  }

})

