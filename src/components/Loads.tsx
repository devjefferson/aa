
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'

import loadAnimation from '../image/loads.json'
import colors from '../Styles/colors';

export function Load(){
  return (
    <View style={styles.container}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background
  },
  animation:{
    backgroundColor: "transparent",
    width: 200,
    height: 200
  }
})