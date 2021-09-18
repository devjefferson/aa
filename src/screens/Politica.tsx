import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions} from 'react-native';
import colors from '../Styles/colors';

// import { Container } from './styles';

export default function Politica(){
  return (
    <View>
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}> TERMOS DE UTILIZAÇÃO E POLÍTICAS DE PRIVACIDADE </Text>
        <Text style={styles.text}>
        

O acesso às funcionalidades de geração de ocorrências na plataforma exigirá a realização de um
cadastro prévio, ao se cadastrar o usuário deverá informar dados recentes e válidos, sendo de sua
exclusiva responsabilidade manter referidos dados atualizados, bem como o usuário se compromete
com a veracidade dos dados fornecidos.
</Text>
<Text style={styles.text}>
Mediante a realização do cadastro o usuário declara e garante expressamente ser plenamente capaz,
podendo exercer e usufruir livremente dos serviços e produtos. O usuário deverá fornecer um endereço
de e-mail válido, através do qual o site realizará todas comunicações necessárias. Dispensamos o uso
de dados pessoais de nossos clientes, tendo como recurso a utilização de um apelido de identificação
utilizado pelo aplicativo para interação com o usuário.
Para melhor utilização do nosso aplicativo, é necessário que o usuário esteja com a localização do
dispositivo ativada durante o acesso. Essas coordenadas podem ser utilizadas para o envio de
notificações de ocorrências futuras, mantendo o usuário informado de eventos que venham ocorrer
próxima a localização de seu último acesso à plataforma.
O usuário se compromete a não informar seus dados cadastrais e/ou de acesso à plataforma a
terceiros, responsabilizando-se integralmente pelo uso que deles seja feito.
Menores de 18 anos e aqueles que não possuírem plena capacidade civil deverão obter previamente o
consentimento expresso de seus responsáveis legais para utilização da plataforma e dos serviços,
sendo de responsabilidade exclusiva dos mesmos o eventual acesso por menores de idade e por
aqueles que não possuem plena capacidade civil sem a prévia autorização.
Após a confirmação do cadastro, o usuário possuirá um login e uma senha pessoal, a qual assegura ao
usuário o acesso individual à mesma. Desta forma, compete ao usuário exclusivamente a manutenção
de referida senha de maneira confidencial e segura, evitando o acesso indevido às informações
pessoais.
Toda e qualquer atividade realizada com o uso da senha será de responsabilidade do usuário, que
deverá informar prontamente a plataforma em caso de uso indevido da respectiva senha. Não será
permitido ceder, vender, alugar ou transferir, de qualquer forma, a conta, que é pessoal e intransferível.
O usuário poderá, a qualquer tempo, requerer o cancelamento de seu cadastro junto ao site __ OU
aplicativo __. O seu descadastramento será realizado o mais rapidamente possível.
O usuário, ao aceitar os Termos e Política de Privacidade, autoriza expressamente a plataforma a
armazenar, tratar, ceder ou utilizar as informações derivadas do uso dos serviços do aplicativo, incluindo
todas as informações preenchidas pelo usuário no momento em que realizar uma ocorrência.
Para mais informações referentes a privacidade e segurança do banco de dados da nossa plataforma:
https://firebase.google.com/support/privacy?hl=pt-br
</Text>
<Text style={styles.text}>
Todas as ocorrências geradas pelo usuário é de sua inteira responsabilidade, qualquer informação
indevida, difamatória, com citação a terceiros ou a grupos não serão aceitas. Não serão permitidas
</Text>
<Text style={styles.text}>
postagens que promovam a violência ou incitem ódio contra indivíduos ou grupos com base em raça ou
origem étnica, religião, deficiência, idade, nacionalidade, orientação sexual, gênero, identidade de
gênero ou outras características associadas à discriminação sistêmica ou à marginalização. As
ocorrências ficarão vinculadas ao perfil do usuário, onde o mesmo poderá excluí-las se necessário.
O campo "Detalhes do Ocorrido" deverá ser utilizado apenas para a descrição dos eventos
presenciados pela vítima ou testemunha. Não serão permitidas acusações, propagandas, difamações
ou qualquer item que fuja do escopo do aplicativo. Portanto, torna-se passível de não aprovação, a
ocorrência que possuir nomes próprios ou de entidades públicas ou privadas.
A insistência do usuário em ferir os TERMOS DE USO deste aplicativo/website o coloca na condição de
ser bloqueado na nossa plataforma, o impedindo de ter acesso aos nossos serviços.
        </Text>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
  
  },
  content:{
    marginTop:40,
    marginHorizontal: 10
  },
  title:{
    fontSize: 28
  },
  text:{
    marginVertical: 20,
    textAlign: "justify"
  }
  
})