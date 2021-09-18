import React from 'react';
import { View, Text, ScrollView,StyleSheet, Image, FlatList} from 'react-native';
import colors from '../Styles/colors';
import CardHelp from '../components/CardHelp';
import add from '../image/add.png'

import assalto from '../image/category/assalto.png'
import furto from '../image/category/furto.png'
import arrastao from '../image/category/arrastao.png'
import veiculo from '../image/category/veiculo.png'
import help from '../image/tab/helpActive.png'
import perfil from '../image/tab/profileactive.png'
import map from '../image/tab/gunsactive.png'
import list from '../image/tab/settingactive.png'
import reload from '../image/reload.png'
import fonts from '../Styles/fonts';

// import { Container } from './styles';

const data = [
  {
    title: "Criar Ocorrência",
    description: "Ao acessar esta área você será direcionado para nossa interface de geração de ocorrência, onde poderá especificar e compartilhar o ocorrido.",
    image: add
  },
  {
    title: "Atualiza o mapa",
    description: "Atualize as informações do mapa pressionando a tecla Atualizar, assim você receberá as informações mais recentes compartilhadas.",
    image: reload
  },
  {
    title: "Tela do mapa",
    description: "Leva você de volta para a tela inicial onde está o mapa e as principais funções do aplicativo.",
    image: map
  },
  {
    title: "Lista de Ocorrência",
    description: "Acessa a lista onde você pode acompanhar as últimas ocorrências compartilhadas pelos usuários.",
    image: list
  },
  {
    title: "Perfil",
    description: "Aqui é o seu perfil, onde você pode visualizar e desativar as suas ocorrências criadas no aplicativo.",
    image: perfil
  }
]

const category = [
  {
    title: "Assalto",
    description: "Assalto à mão armada, aquele em que os assaltantes utilizam armas para intimidar ou atacar as suas vítimas.",
    image: assalto
  },
  {
    title: "Furto",
    description: "O crime de furto é descrito como subtração, ou seja, diminuição do patrimônio de outra pessoa, sem que haja violência.",
    image: furto
  },
  {
    title: "Arrastão",
    description: "Assalto coletivo em que um grupo de pessoas aborda uma ou mais pessoas no decorrer de um caminho.",
    image: arrastao
  },
  {
    title: "Roubo de veículos",
    description: "Situação em que o veículo é roubado, podendo ser na presença ou não, do proprietário.",
    image: veiculo
  },
]

export default function Help(){
  
  return(
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Central de ajuda.</Text>

     <FlatList 
      data={data}
      keyExtractor={(item, value) => String(value)}
      renderItem={({item})=>{
        
        return (
          <CardHelp 
          title={item.title}
          description={item.description}
          image={item.image}
          h={170}
        />
        )
      }}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
     />
      <Text style={styles.title}>Tipos de Ocorrências.</Text>
      <FlatList 
      data={category}
      keyExtractor={(item, value) => String(value)}
      renderItem={({item})=>{
        
        return (
          <CardHelp 
          title={item.title}
          description={item.description}
          image={item.image}
          h={140}
        />
        )
      }}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
     />
      <Text style={styles.title}>Ainda precisa de ajuda?</Text>

      <CardHelp 
        title="Entre en contato conosco"
        description="suporte@alertaassalto.com.br"
        image={help}
        link='drpcscan@gmail.com'
        titleSize={12}
        h={120}
      />

    
    </ScrollView>

    
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.background,
    marginTop: 24,
    
  },
  title:{
    textAlign: 'center',
    fontSize: 20,
    color: colors.segundary,
    fontFamily: fonts.heading,
    marginVertical: 20,
  
  }
})