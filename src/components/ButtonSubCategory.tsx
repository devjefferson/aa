import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import colors from '../Styles/colors';
import fonts from '../Styles/fonts';

interface ButtonData extends RectButtonProperties{
  title: string
  active?: boolean
}

export function ButtonSubCategory({title, active = false, ...rest}:ButtonData){
  return(
    <RectButton style={[styles.container, active && styles.containerActive]} {...rest}> 
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.segundary,
    borderRadius: 12,
    height: 30,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    //paddingHorizontal: 10,
  },
  containerActive:{
    backgroundColor: colors.green_light
  },
  text:{
    fontSize: 12,
    fontFamily: fonts.text,
    color: colors.background
  },
  textActive:{
    color: colors.green,
    fontFamily: fonts.heading,
  }
})