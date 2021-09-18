import React, { useContext, useEffect } from "react";
import {
  Text,
  Dimensions,
  Image,
  StyleSheet,
  SafeAreaView,
  View,
} from "react-native";
import WelcomeImage from "../image/welcome/welcome-image.png";

import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/core";
import colors from "../Styles/colors";
import fonts from "../Styles/fonts";
import { ScrollView } from "react-native-gesture-handler";

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }

  return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.content}>
      <Text style={styles.title}>Bem vindo ao {"\n"} Alerta Assalto.</Text>

      <Image
        source={WelcomeImage}
        style={styles.image}
        //resizeMode="contain"
      />

      <Text style={styles.subtitle}>
      Aplicativo criado para{"\n"}mapear e compartilhar{"\n"}informações sobre crimes {"\n"}ocorridos na sua região.
      </Text>

      <View style={styles.containerButton}>
        <Button title="Próximo" onPress={handleStart} />
      </View>
      </SafeAreaView>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: colors.background,
    height: Dimensions.get("window").height
  },
  content:{
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    height: Dimensions.get("window").height
    
    //paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    color: colors.segundary,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 30,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 15,
    color: colors.segundary,
    fontFamily: fonts.text,
  },
  image: {
    width: Dimensions.get("window").width,
  },
  containerButton:{
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 20
  }
});
