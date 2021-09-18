import { useNavigation } from "@react-navigation/core";
import React, {  useContext, useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View, TextInput,FlatList, RefreshControl, } from "react-native";
import { Button } from "../components/Button";
import { CardOcorrencePrimary } from "../components/CardOcorrencePrimary";
import { Load } from "../components/Loads";
import AppContext from "../Provider";
import colors from "../Styles/colors";
import fonts from "../Styles/fonts";
import search from '../image/search.png'
import { DataCategoryProps } from "../hooks/useOcorrence";



export function ListFiltedOcorrence() {
  const [ocorrence, setOcorrence] = useState<DataCategoryProps[]>();

  const [searchLocation, setSearchLocation] = useState<string | any>()
  var [pagination, setPagination] = useState<number>(1)
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastItem, setLastItem] = useState<any>()
  const [refreshing, setRefreshing] = useState(false)
  const { getListOccurrence, getListUpdate,
    getListSearch,  
    getListSearchUpdate,
  } = useContext(AppContext);
  const navigation = useNavigation();

 
 
  useEffect(() => {
    setList()
    return ()=> new AbortController().abort(); 
  }, []);


  const setList = async ()=>{
    const { list, lastItemList } = await getListOccurrence(String(pagination))      
    setOcorrence(list)
    setLastItem(lastItemList)
  }
  async function handleFetchMore(distance: number) {
  try {
    if (distance < 1) {
      setLoadingMore(false)
      return;
    }
    
    setLoadingMore(true);
    setPagination(pagination + 1)
    if(!searchLocation){
      const newList = await getListUpdate(lastItem)
      setOcorrence(ocorrence?.concat(newList.list))
      setLastItem(newList.lastItemList)
    } else {
      const newList = await getListSearchUpdate(lastItem, searchLocation.toLocaleLowerCase())
      setOcorrence(ocorrence?.concat(newList.list))
     setLastItem(newList.lastItemList)
    }
  
     

  } catch (error) {
    setLoadingMore(false)
  }
  }

  async function handleDetails(data: DataCategoryProps) {
    navigation.navigate("DetailsOcorrenceList", { ocorrenceData: data});

    
  }

  function _onRefresh(){
    setRefreshing(true)
    setList().then(data=>{
      setRefreshing(false)
    })
  }

  async function handleSearchLocation(){
      setPagination(1)
      setOcorrence([])
      if(!searchLocation){
        setList()
        return
      }   
       const { list, lastItemList } = await getListSearch(searchLocation.toLocaleLowerCase())
       setOcorrence(list)
       setLastItem(lastItemList)
       if(list.length <= 5){
        setLoadingMore(false)
       }
       
  
    }

  if (!ocorrence) {
    return <Load />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerSearch}>
        <Text style={styles.Title}>Lista de Ocorrências</Text>
        <View style={styles.search}>
          <TextInput style={styles.input} onChangeText={setSearchLocation} placeholder="Bairro"/>
          <Button
            icon={search}
            h={45}
            w={45}
            onPress={handleSearchLocation}
          />
        </View>
        <Text style={styles.sub}>Resultado</Text>
      </View>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />}
        data={ocorrence}
        keyExtractor={(item, value) => String(value)}
        renderItem={({index, item})=>(
          <CardOcorrencePrimary
            index={index}
            data={item as any}
            onPress={() => handleDetails(item)} />
        )} 
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
        ListFooterComponent={
          loadingMore ? (
          
            <ActivityIndicator color={colors.segundary} />
           
          ) : <></>
        }
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  Title:{
    marginTop: Platform.OS == 'android' && 40 || 'none',
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.segundary,
  },
  containerSearch:{
   
  
  },
  search:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center"
  },
  input:{
    backgroundColor: colors.white,
    width: 270,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    fontFamily: fonts.text,
    borderColor: colors.segundary,
    paddingHorizontal: 10,
    color: colors.segundary,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  sub:{
    fontFamily: fonts.text,
    fontSize: 18,
    color: colors.segundary,
    borderBottomWidth: 1,
    borderColor: colors.segundary,
    height: 26,
  }
});
 