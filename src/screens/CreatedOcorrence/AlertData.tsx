import { useNavigation, useRoute } from "@react-navigation/core";
import { DataCategoryProps } from "IntefaceDefalut";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, FlatList, StyleSheet, Text, TextInput, View, Platform, Alert, Modal, Image, Pressable, TouchableHighlight } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ButtonSubCategory } from "../../components/ButtonSubCategory";


import { format, isAfter } from "date-fns";
import AppContext from "../../Provider";
import colors from "../../Styles/colors";
import fonts from "../../Styles/fonts";
import RefactorText from "../../utils/RefactorText";
import HeadImage from '../../image/alert/head.png'

interface DataParams extends DataCategoryProps {
  subcategory?: string[] | any
}

const AlertData: React.FC = () => {
  const [selectSubCategory, setSelectSubCategory] = useState<number>();
  const { setOcorrence, userData } = useContext(AppContext);
  const route = useRoute();
  const navigation = useNavigation();
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [detalhes, setDetalhes] = useState<string | null>(null);
  const [death, setDeath] = useState(false);
  const [placa, setPlaca] = useState<string | null>(null);
  const [cor, setCor] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == "ios");
  const [dataType, setDataType] = useState<string>('date');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [letterCount, setLetterCount] = useState(245)
  const [limit, setLimit] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  const Params = route.params as DataParams;

  useEffect(() => {
    if (!Params) {
      navigation.goBack();
    }

    return ()=>{
      new AbortController().abort();
    }
  }, []);

  function handleSelectSubCategory(num: number) {
    setSelectSubCategory(num)
    switch (Params.subcategory[num]) {
      case 'Residencial':
        setSubCategory('residencial')
        break;
      case 'Comércio':
        setSubCategory('empresa')
        break;
      case 'moto':
        setSubCategory('moto')
        break;
      case 'carro':
        setSubCategory('carro')
        break;
      case 'rua':
        setSubCategory('furto')
        break;
      default: setSubCategory(null)
        break;
    }

  }



  async function handleSubmit() {

    const { city, subregion, country, postalCode, district, category, street } = Params
    const tag = []

    tag.push(
      city != null ? RefactorText(city) : null,
      subregion != null ? RefactorText(subregion) : null,
      country != null ? RefactorText(country) : null,
      postalCode != null ? RefactorText(postalCode) : null,
      postalCode,
      district != null ? RefactorText(district) : null,
      subCategory != null ? RefactorText(subCategory) : null,
      category != null ? RefactorText(category) : null,
      street != null ? RefactorText(street) : null
    )

    if(limit == false){
      setOcorrence({
        ...Params,
        detalhes,
        subcategory: subCategory,
        death,
        dateOcorrence: selectedDate,
        dateRegister: new Date(),
        cor,
        tag,
        placa,
        userData,
      }).then(() => {
        navigation.navigate("MapScreen");
       
      });

      setLimit(true)
    }

    
  }

  function handleChangeTime(_: Event, dateTime?: Date) {

    if (Platform.OS == "android") {
      setShowDatePicker(oldState => !oldState);


    }

    if (dateTime && isAfter(dateTime, new Date())) {
      setSelectedDate(new Date());
      return Alert.alert("Escolha uma data no passado!");
    }

    if (!dateTime) {
      setDataType("date")
      setDataType('time')
      return
    }

    const current = dateTime as Date
    setSelectedDate(current);

  }

  function handleChangeTimeCancel() {

    setSelectedDate(selectedDate)
  }

  function handleOpenDatePickerForAndroid() {

    setDataType("date")
    setShowDatePicker((oldState) => !oldState);

  }

  function handleOpenTimePickerForAndroid() {

    setDataType('time')
    setShowDatePicker((oldState) => !oldState);

  }


  return (
    <ScrollView style={styles.content}>
    <View style={styles.container}>
      <View>
        <Text style={styles.labelTitle} >Detalhe a sua ocorrencia</Text>
        <View style={styles.lineBorder}></View>
        {
          Params.subcategory && <Text style={styles.labelSubCategory}>Selecione um tipo de {Params.category}</Text>
        }
        <View style={styles.list}>

          <FlatList
            data={Params.subcategory}
            keyExtractor={(item, value) => String(value)}
            renderItem={({ item, index }) =>
              <ButtonSubCategory
                title={item}
                active={index == selectSubCategory}
                onPress={() => handleSelectSubCategory(index)}
              />}
            horizontal={true}

          />
        </View>
        <View>
          <View>
            <Text style={styles.label}>Detalhes do ocorrido.</Text>
            <TextInput
              multiline
              maxLength={245}
              onChangeText={setDetalhes}
              style={[styles.input, { height: 110 }]}
            />
            <Text style={styles.count}>{detalhes ? detalhes?.length - letterCount : letterCount}</Text>
          </View>
          {Params.category == "veiculo" ? (
            <>
              <Text style={styles.label} >Placa do veículo</Text>
              <TextInput onChangeText={setPlaca} style={[styles.input]} />
              <Text style={styles.label} >Cor do veículo</Text>
              <TextInput onChangeText={setCor} style={[styles.input]} />
            </>
          ) : (
            <>
            </>
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode={dataType as any}
            display="default"
            onChange={handleChangeTime}
            onTouchCancel={handleChangeTimeCancel}

          />
        )}
        {
          Platform.OS == 'android' && (
            <>
              <TouchableOpacity style={styles.dateTimePickerButton} onPress={handleOpenDatePickerForAndroid}>
                <Text style={styles.dateTimePickerText}>
                  {`Data ${format(selectedDate, 'dd/MM/yyyy')}`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateTimePickerButton} onPress={handleOpenTimePickerForAndroid}>
                <Text style={styles.dateTimePickerText}>
                  {`Horário ${format(selectedDate, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            </>

          )
        }
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Sua ocorrência não será cadastrada!");
          setModalVisible(!modalVisible);
        }}
      >
        <View
            style={styles.containerModal}
            >

        
          <View style={styles.centeredView} >
             <View style={styles.containerTextImage}>
             <View style={styles.imageContainer}>
              <Image 
              source={HeadImage}
              
            />
              </View>
              <View>
                  
              <Text style={styles.modalTitle}>Lembrete Importante:</Text>
                <Text style={styles.modalSubtitle}>
                    As ocorrências geradas no aplicativo Alerta Assalto não possuem valor legal, apenas informativo. Em todos os casos é recomendável entrar em contato com a polícia e realizar o boletim de ocorrência.
                </Text>
              </View>
             </View>
              <View>
              
                <View style={styles.containerButton}>
                <TouchableHighlight style={{...styles.buttonModal, backgroundColor: colors.segundary}} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonModal} onPress={()=>setModalVisible(!modalVisible)}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableHighlight>
                </View>
              </View>          
         
      </View>
      
      </View>
      </Modal>


      <TouchableOpacity style={styles.button} onPress={()=>setModalVisible(true)}>
        <Text style={styles.buttonText}>Cadastrar Ocorrência</Text>
      </TouchableOpacity>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content:{
    height: Dimensions.get("screen").height,
    backgroundColor: colors.background,
    
  },
  container: {
    alignItems: "center",
    justifyContent: 'space-around',
    flex: 1,
    paddingTop: 40,    
  },
  labelTitle: {
    fontSize: 20,
    fontFamily: fonts.text,
    marginBottom: 5,
    color: colors.segundary,
  },
  labelSubCategory: {
    fontSize: 20,
    fontFamily: fonts.text,
    marginBottom: 5,
    color: colors.text_subtitle,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.text_subtitle,
  },
  lineBorder: {
    borderWidth: 1,
    width: 300,
    borderColor: "#ddd",
    marginVertical: 25,
  },
  count: {
    position: 'relative',
    bottom: 30,
    width: "100%",
    textAlign: 'right',
    paddingHorizontal: 10,
  },
  list: {
    height: 50
  },
  inputPlaca: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d3e2e6",
  },
  input: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderColor: "#d3e2e6",
    width: 300,
    height: 56,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "#FFF",
    textAlignVertical: "top",
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 20,
    borderColor: colors.segundary
  },
  dateTimePickerText: {
    color: colors.segundary,
    fontSize: 24,
    fontFamily: fonts.heading,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.segundary,
    width: Dimensions.get('window').width - 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 10
  },
  buttonText: {
    fontFamily: fonts.heading,
    fontSize: 20,

  },
  containerModal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  'rgba(47, 72, 88, 1.2)',
    
  },
  centeredView:{
    
    //marginTop: Dimensions.get('screen').height / 3,
    height: 350,
    marginHorizontal: 10

  },
  imageContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100
  },
  modalTitle:{
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.background,
    textAlign: "center"   
   
  },
  modalSubtitle:{
    fontFamily: fonts.text,
    fontSize: 18,
    color: colors.background,
    textAlign: "justify",
    paddingHorizontal: 20
    
  },
  containerButton:{
    flexDirection: 'row'
  },
  containerTextImage:{
    backgroundColor: colors.segundary,
    marginHorizontal: 15,
    borderRadius: 12,
  },
  buttonModal:{
    marginHorizontal: 20,
    backgroundColor: colors.segundary,
    width: 160,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 10
  }
});

export default AlertData;
