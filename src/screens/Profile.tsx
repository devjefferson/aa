import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AppContext from "../Provider";
import { CardOcorrenceSegundary } from "../components/CardOcorrenceProfile";
import { Load } from "../components/Loads";
import { useNavigation } from "@react-navigation/core";
import fonts from "../Styles/fonts";
import colors from "../Styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataCategoryProps } from "../hooks/useOcorrence";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Admob from "../components/Admob";

export function Profile() {
  const [ocorrence, setOcorrence] = useState<DataCategoryProps[]>();
  const [userName, setUserName] = useState<string>();
  const [lastItem, setLastItem] = useState<any>()
  const [loadingMore, setLoadingMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false)
  const {
    SignOut,
    userData,
    deleteOcorrenceUser,
    getOcorrenceUser,
    getListUserUpdate
  } = useContext(AppContext);

  const navigation = useNavigation();

  useEffect(()=>{
    listUser()
    return ()=> {
      new AbortController().abort()
    }
  },[])

  useEffect(() => {   

    (async()=>{
      if(!userData?.displayName){
        const userLocal = await AsyncStorage.getItem("@SBAuth:username")
        setUserName(userLocal as string)
        return
      }
      setUserName(userData?.displayName)
    })()
    return ()=> {
      new AbortController().abort()
    }
  }, []);

  async function listUser(){
    const response = await getOcorrenceUser(userData?.uid)
    setLastItem(response.lastItemList)
    setOcorrence(response.list)
  }

  function _onRefresh(){
    setRefreshing(true)
    listUser().then(data=>{
      setRefreshing(false)
    })
  }



  async function handleFetchMore(distance: number) {
    try {
      if (distance < 1) {
        setLoadingMore(false)
        return;
      }
      
      setLoadingMore(true);
      const { list, lastItemList} = await getListUserUpdate(lastItem, userData?.uid)
      setLastItem(lastItemList)
      setOcorrence(ocorrence?.concat(list))
      
    } catch (error) {
      setLoadingMore(false)
    }
  }
  function handleDetails(data: DataCategoryProps) {
    navigation.navigate("DetailsOcorrenceList", { ocorrenceData: data });
  }

  function handleDelete(id: string | any) {
    deleteOcorrenceUser(id)
    listUser()
    
  }

  function handleSignOut() {
    SignOut()
    navigation.goBack()
  }

  if (!ocorrence) {
    return <Load />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Olá, {"\n"} {userName}
        </Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.sair}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerSubTitle}>Suas Ocorrências</Text>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />}
        data={ocorrence}
        keyExtractor={(item, value) => String(value)}
        renderItem={({ index, item }) => (
          <>
          {index % 8 == 0 ? <View style={styles.ads}><Admob
            id={"ca-app-pub-7185818297801314/9092724216"}
          /></View> : <></>}
          <CardOcorrenceSegundary
            index={index}
            data={item}
            onClick={() => handleDetails(item)}
            deleteOcorrence={() => handleDelete(item.id)}
          />
          </>
        )}
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator color={colors.segundary} /> : <></>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242f3e",
    alignItems: 'center'
  },
  content: {
    paddingHorizontal: 20,
  },
  ads:{
     justifyContent: 'center',
     alignItems: 'center',
     marginVertical: 3
   },
  header: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 80,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  headerTitle: {
    paddingTop: 20,
    fontSize: 20,
    fontFamily: fonts.heading,
    color: colors.segundary,
  },
  sair: {
    paddingTop: 20,
    fontSize: 20,
    fontFamily: fonts.text,
    color: colors.segundary,
  },
  headerSubTitle: {
    marginHorizontal: 20,
    fontSize: 20,
    fontFamily: fonts.heading,
    color: colors.white,
    marginBottom: 10,
  },
  icon: {
    color: "white",
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
  }
});
