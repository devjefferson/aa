import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import colors from '../Styles/colors';
import fonts from '../Styles/fonts';

// import { Container } from './styles';

export function Header (){
  
  return(
    <View style={styles.conatiner}>
      
      <Text style={styles.text}>
        Olá, {'\n'} Jefferson
      </Text>
      <View style={styles.border}/>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner:{
    width: Dimensions.get('window').width,
    paddingHorizontal: 40,
    marginTop: 40,
  },
  border:{
    borderBottomWidth: .5,
    borderColor: colors.gray,
    marginHorizontal: -5,
    opacity: 0.4
  },
  text:{
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.segundary
  }
})