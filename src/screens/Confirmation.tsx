import React from "react";
import {
  Text,
  Dimensions,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import ConfirmationImage from "../image/welcome/confirmation.png";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/core";
import colors from "../Styles/colors";
import fonts from "../Styles/fonts";
import { ScrollView } from "react-native-gesture-handler";

export function Confirmation() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("HomeStack");
  }
  return (
    
    
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.content}>
      <Text style={styles.title}>
      Se você presenciou ou{"\n"}foi vítima de um assalto{"\n"}procure as autoridades {"\n"}competentes.
      </Text>

      <Image
        source={ConfirmationImage}
        style={styles.image}
        //resizeMode="contain"
      />

      <Button title="Próximo" onPress={handleStart} />
      </SafeAreaView>
      </ScrollView>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    
  },
  content:{
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: Dimensions.get("window").height
    //paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: colors.segundary,
    marginTop: 32,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 22,
    lineHeight: 32,
    paddingHorizontal: 20,
    color: colors.segundary,
    fontFamily: fonts.text,
  },
  image: {
    height: 300,
    resizeMode: 'contain'
    //backgroundColor: "red"
  },
});
