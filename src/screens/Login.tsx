import React, { useContext, useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import emailIcon from "../image/email.png";
import lock from "../image/lock.png";
import background from "../image/background-login.png";
import Logo from "../image/logo-header.png";
import AppContext from "../Provider";
import { useNavigation } from "@react-navigation/core";
import colors from "../constants/colors";
import { Button } from "../components/Button";
import { Input } from "../components/Input"
import fonts from "../Styles/fonts";


export function LoginUp(): any {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string | null>();

  const { SignIn } = useContext(AppContext)

  const { navigate } = useNavigation()

  async function handleSubmit(){
    if(!email || !password){
      return
    }
    SignIn(email, password).then((data)=>{
      navigate('HomeStack')
    }, (Erros) => {
      setErrors(String("Por favor digite um email e senha validos."))
    })
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
      <Image style={styles.background} source={background} />
      <View style={styles.containerLogin}>
        
        <Image style={styles.logoHeader} source={Logo} />
        {
          !errors ? null : (
            <View style={styles.error}>
            <Text style={styles.errorText}>{errors}</Text>
          </View>
          )
        }
        <Input
          image={emailIcon}
          title='Email'
          autoCompleteType="email"
          onChangeText={setEmail}
          placeholder="richard@exemplo.com"
        />
        <Input 
          image={lock}
          title='Senha'
          secureTextEntry
          autoCompleteType="password"
          onChangeText={setPassword}
          placeholder="********"
        />

        <Button title="Entrar"  onPress={handleSubmit}/>

        <TouchableOpacity onPress={() => navigate("Recuver")}>
          <Text style={styles.recuverPassword}> Esqueceu sua senha? </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recuverContainer}>
        <Text style={styles.textRegister}> Ainda não possui conta? </Text>
        <TouchableOpacity onPress={() => navigate("Register")}>
          <Text style={styles.textRegisterButton}>Registre-se</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    
  },
  content:{
    marginTop: 28,
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 25,
    position: "absolute",
  },
  containerLogin: {
    padding: 10,
    width: 350,
    height: 436,
    justifyContent:"center",
    alignItems: "center",
   // backgroundColor: colors.background,
    borderRadius: 12,
    position: "relative",
  },
 /* error:{
    backgroundColor: colors.red,
    paddingHorizontal: 20,
  },
  errorText:{
    color: colors.white,
    fontFamily: fonts.heading,
  },*/
  logoHeader: {
    width: 128,
    height: 149,
    marginTop: -100,
    marginBottom: 20,
  },
  
  recuverPassword: {
    color: colors.segundary,
    fontFamily: fonts.text,
    marginTop: 10,
  },

  recuverContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
  },
  error: {
    backgroundColor: colors.red,
    position: "absolute",
    paddingHorizontal: 20,
    zIndex: 1,
    flex: 1,
    top: 85,
  },
  errorText: {
    zIndex: 10,
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.heading,
    //marginHorizontal: 20,
  },
  textRegister: {
    color: "white",
    fontFamily: fonts.text,
  },
  textRegisterButton: {
    color: colors.segundary,
    fontFamily: fonts.heading,
  },
});
