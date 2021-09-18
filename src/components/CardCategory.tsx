
import React from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import colors from '../Styles/colors';
import fonts from '../Styles/fonts';
import image from '../image'


interface DataButtonProps extends RectButtonProperties{
  title: string,
  category: string,
  subcategory?: string[]
}


export function CardCategory({ title,category,subcategory,...rest}: DataButtonProps){
  return (
    <View>
      <RectButton style={styles.container} {...rest}>
        <Image source={image.[category]} />
        <Text style={styles.text}>
        {title}
        </Text>
        
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.segundary,
    width: 150,
    height: 170,
    borderWidth: 1,
    shadowOpacity: 0.2,
    shadowColor: "#666",
    shadowOffset: {
      height: 120,
      width: 20
    },
    elevation: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 8,
    margin: 8
  },
  text:{
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.heading,
    textTransform: "capitalize",
    marginBottom: 10
  },
  containerList:{
    position: 'absolute',
    bottom: 10,
    
  },
  subcategory:{
    fontSize: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderColor: colors.segundary,
    borderWidth: 1,
    height: 20,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 5,
    fontFamily: fonts.text,
    textTransform: "capitalize"

  }
})