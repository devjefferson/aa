import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity

} from "react-native";
import emailIcon from "../image/email.png";
import lock from "../image/lock.png";
import profileactive from '../image/tab/profileactive.png'
import background from "../image/background-login.png";
import Logo from "../image/logo-header.png";
import AppContext from "../Provider";
import { useNavigation } from "@react-navigation/core";
import { Switch } from "react-native-gesture-handler";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import colors from "../Styles/colors";
import fonts from "../Styles/fonts";

const Register: React.FC = () => {
  const [toAgree, setToAgree] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errors, setErrors] = useState<string | null>();

  const navigation = useNavigation();

  const { signUp} = useContext(AppContext);

  function handleToAgree() {
    if (toAgree == false) {
      setToAgree(true);
    } else {
      setToAgree(false);
    }
  }

  function handleSignUp() {

    if (!toAgree) {
      setErrors("Você precisa aceitar os termos!")
      return;
    }

    if (!name) {
      setErrors("Digite um nome Válido!")
      return

    }

    if (!password) {
      setErrors("Uma senha com mais de 8 Caracteres!")
      return
    }
    
    if(password.length < 8){
      setErrors("Uma senha com mais de 8 Caracteres!")
      return
    }

    signUp({ name, email, password }).then(() => {
      navigation.navigate('MapScreen')
    }, (Error) => {
      console.log(Error)
      setErrors("O e-mail já está cadastrado!")
    })


  }
  return (
    <ScrollView style={styles.container}>
    <View style={styles.content}>
      <Image style={styles.background} source={background} />
      <View style={styles.containerLogin}>

        <>
          <Image style={styles.logoHeader} source={Logo} />

          <View style={errors ? styles.error : null}>
            <Text style={styles.errorText}>{errors}</Text>
          </View>
          <Input
            title='Nome ou Apelido'
            image={profileactive}
            autoCompleteType="name"
            onChangeText={setName}
            placeholder="richard"
          />
          <Input
            title='E-mail'
            image={emailIcon}
            autoCompleteType="email"
            onChangeText={setEmail}
            placeholder="richard@exemplo.com"
          />
          <Input
            title='Senha'
            image={lock}
            autoCompleteType="password"
            secureTextEntry
            onChangeText={setPassword}
            placeholder="* * * * * * * *"
          />
          <View style={styles.switch}>
            <TouchableOpacity onPress={()=>navigation.navigate('Politica')}>
              <Text style={styles.toAgree}>
                Você aceita os nossos Termos?
              </Text>
            </TouchableOpacity>
            <Switch
              thumbColor="#fff"
              trackColor={{ false: "#ccc", true: "#39CC83" }}
              value={toAgree}
              onValueChange={handleToAgree}
            />
          </View>

          <View style={styles.containerButtons}>
            <Button title='Cadastrar' w={200} onPress={handleSignUp} />
          </View>

        </>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
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
    height: Dimensions.get("window").height,
    position: "absolute",
  },
  containerLogin: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 350,
    height: 550,
    backgroundColor: colors.background,
    borderRadius: 32,
    position: "relative",
  },
  logoHeader: {
    width: 128,
    height: 149,
    marginTop: -130,
    marginBottom: 40,
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
  inputContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowRadius: 5,
    shadowColor: "#ddd",
    shadowOpacity: 0.28,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  inputText: {
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
    borderRadius: 20,
  },
  containerButtons: {
    flexDirection: "row",
  },
  switch: {
    flexDirection: "row",
    width: 300,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  toAgree: {
    color: "#fff",
    marginRight: 10,
  },
  buttom: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.segundary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    shadowColor: "#666",
    elevation: 1,
    height: 56,
    width: 214,
    borderRadius: 42,
  },
});

export default Register;
