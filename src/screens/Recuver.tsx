import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import emailIcon from "../image/email.png";
import background from "../image/background-login.png";
import Logo from "../image/logo-header.png";
import { useNavigation } from "@react-navigation/core";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { LoginUp } from "./Login";
import AppContext from "../Provider";
import fonts from "../Styles/fonts";
import colors from "../Styles/colors";

interface dataError {
  code: number,
  message: string
}

const Recuver: React.FC = ()=>{
  const { recuverPassword } = useContext(AppContext)
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<dataError| undefined>();
  const navigation = useNavigation()

 function handRecuver(){
     recuverPassword(email).then(()=>{
      setMsg({
        code: 300,
        message: "Enviado com sucesso!"
      })
      setTimeout(()=>{
        navigation.goBack()
      },800)
     }).catch(error=>{
        setMsg({
          code: 401,
          message: error.message
        })
     })

  }
  return (
    <View style={styles.container}>
      <Image style={styles.background} source={background} />
      <View style={styles.containerLogin}>
        <Image style={styles.logoHeader} source={Logo} />
        <Input 
          title='Email' 
          image={emailIcon} 
          onChangeText={setEmail}
          placeholder="richard@exemplo.com"
        />
 <Text style={[msg && (msg.code == 300? styles.success : styles.error)]}>{msg?.message}</Text>
        <View style={styles.containerButtons}>          
        <Button 
          title='enviar'
          onPress={handRecuver}
          w={150}
        />
        <Button 
          title='voltar' 
          w={150}
          onPress={navigation.goBack}
        />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 25,
    position: "absolute",
    
  },
  containerLogin: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 350,
    height: 300,
   // backgroundColor: "#2F4858",
    borderRadius: 32,
  },
  logoHeader: {
    width: 128,
    height: 149,
    marginTop: -130,
    marginBottom: 20,
  },
  containerButtons:{
      flexDirection: 'row',
  },
  success:{
    backgroundColor: colors.green,
    marginBottom: 10,
    fontFamily: fonts.text,
    color: colors.white,
    paddingHorizontal: 4

  },
  error:{
    backgroundColor: colors.red,
    marginBottom: 10,
    fontFamily: fonts.text,
    color: colors.white,
    paddingHorizontal: 4
  }
});

export default Recuver;
