import React from 'react';
import { Dimensions, StyleSheet, Text, Image } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import colors from '../Styles/colors';
import fonts from '../Styles/fonts';

// import { Container } from './styles';

interface ButtonData extends RectButtonProperties{
  title?: string,
  icon?: any,
  w?: number,
  h?: number
}

export function Button({title, icon, w, h, ...rest}:ButtonData){
  return(
    <RectButton style={[styles.container,  w ? {width: w, height: h} : null]} {...rest}> 
      {title && <Text style={[styles.text]}>{title}</Text>}
      {icon && <Image  source={icon} style={[{width: w && w - 10, height: h && h - 15, resizeMode:'contain'}]} />}
    </RectButton>
  )
}

export function ButtonFloat({title, icon, w, h = 40, ...rest}:ButtonData){
  return(
    <RectButton style={[styles.container,styles.float, w ? {width: w} : null]} {...rest}> 
      {title && <Text style={[styles.text]}>{title}</Text>}
      {icon && <Image  source={icon} style={[{width: 25, height: 28}]} />}
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.segundary,
    borderRadius: 10,
    height: 56,
    width: Dimensions.get('window').width - 80,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    //marginRight: 20,
    //paddingHorizontal: 10,
  },
  containerActive:{
    backgroundColor: colors.green_light
  },
  text:{
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.background
  },

  float:{
    //position: 'absolute',
    //bottom: 20
  }

})