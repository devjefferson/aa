import React from 'react';
import {
  StyleSheet, View,
  Text,
  TextInput,
  Image,
  TextInputProps,
  ImageSourcePropType
} from 'react-native';
import colors from '../constants/colors';
import fonts from '../Styles/fonts';

interface DataInput extends TextInputProps {
  image: ImageSourcePropType,
  title: string
}
export function Input({ image, title, ...props }: DataInput) {

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputText}>{title}</Text>
      <View style={styles.inputContent}>
        <Image source={image} style={styles.image} />
        <TextInput
          style={styles.input}
          {...props}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowRadius: 5,
    shadowColor: colors.shape,
    shadowOpacity: 0.28,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  inputText: {
    fontFamily: fonts.text,
    color: colors.background,
    textAlignVertical: "bottom",
    marginBottom: -10,
    marginLeft: 5,
    marginTop: 10,
  },
  inputContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxHeight: 18,
    width: 18,
    marginLeft: 5,
  },
  input: {
    height: 60,
    width: 300,
    paddingStart: 10,
    fontSize: 18,
    borderRadius: 12, 
    fontFamily: fonts.text
  }
})