import React, { useContext, useState } from "react";
import { Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

import { Button } from "../components/Button";
import colors from "../Styles/colors";
import fonts from "../Styles/fonts";

import AppContext from "../Provider";

export function UserIdentification() {
  const [userName, setUsername] = useState<string>();
  const { setUsernameStarted } = useContext(AppContext);
  const navigation = useNavigation();

  function handleStart() {
    setUsernameStarted(userName as string).then(() => {
      navigation.navigate("Confirmation");
    });

    navigation.navigate("Confirmation");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Como podemos {"\n"}
        chamar você?
      </Text>

      <TextInput onChangeText={setUsername} style={styles.input} />

      <Button title="Confirmar" onPress={handleStart} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.segundary,
    textAlign: "center",
    fontSize: 22,
  },
  input: {
    width: Dimensions.get("window").width - 80,
    height: 60,
    marginVertical: 20,
    backgroundColor: colors.gray,
    fontFamily: fonts.heading,
    textAlign: "center",
    borderRadius: 10,
  },
});
