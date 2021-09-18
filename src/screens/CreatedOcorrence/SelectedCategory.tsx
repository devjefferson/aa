import { useNavigation, useRoute } from "@react-navigation/core";
import { DataLocation } from "IntefaceDefalut";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CardCategory } from "../../components/CardCategory";
import { Header } from "../../components/Header";
import colors from "../../Styles/colors";
import fonts from "../../Styles/fonts";
import { Load } from "../../components/Loads";
import Admob from "../../components/Admob";

interface DataCategory extends DataLocation {
  category?: string;
  subcategory?: string[];
}

const DataCategory = [
  {
    title: "Furto",
    id: "1",
    category: "furto",
    subcategory: ["Rua", "Residencial", "Comércio"],
  },
  { title: "Assalto", id: "2", category: "assalto" },
  {
    title: "Roubo de Veículo",
    id: "3",
    category: "veiculo",
    subcategory: ["carro", "moto"],
  },
  { title: "Arrastão", id: "4", category: "arrastao" },
];

export function SelectedCategory() {
  const navigation = useNavigation();
  const route = useRoute();

  const Params = route.params as any;

  function handSubmit(category?: DataCategory, subcategory?: "") {

    

    navigation.navigate(
      "AlertData",
      Object.assign({}, Params.data, Params.position, { category, subcategory })
    );
  }

  if(!Params.data && Params.position){
    return <Load/>
  }
  
  return (
    <View style={styles.container}>

    <View style={styles.containerCardCategory}>
    <Text style={styles.title}>Selecione uma Categoria</Text>
     
     <FlatList
          data={DataCategory}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <CardCategory
              title={item.title}
              category={item.category}
              subcategory={item.subcategory}
              onPress={() => handSubmit(item.category, item.subcategory)}
            />
          )}
          numColumns={2}
          style={styles.flatlist}
        />
        <Admob 
          id="ca-app-pub-7185818297801314/8423851824"
        />

    </View>

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
    backgroundColor: colors.background,
  },  
  containerCardCategory:{
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get('window').height,
    paddingVertical: 50
  },
  title: {
    width: Dimensions.get("window").width,
    fontSize: 20,
    fontFamily: fonts.heading,
    color: colors.segundary,
    textAlign: "left",
    paddingHorizontal: 40,
    marginBottom: 10,
    marginTop: 10,
  },
  flatlist: {
    zIndex: 1,
    maxHeight:600
  },
});
