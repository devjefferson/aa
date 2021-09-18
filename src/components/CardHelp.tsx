import React from 'react';
import { View, Text, ScrollView,StyleSheet, Image} from 'react-native';
import colors from '../Styles/colors';
import add from '../image/add.png'
import fonts from '../Styles/fonts';
import { Link } from '@react-navigation/native';

// import { Container } from './styles';

export interface CardHelpProps{
  image: any
  title: string
  description?: string
  h?: number,
  link?: string
  titleSize?: number
}

export default function CardHelp({image, h,titleSize , title, description, link}: CardHelpProps){
  return(
      <View style={[styles.containerCard,{ height: !h ? 190 : h}]}>
        <View style={styles.imageCardContainer}>
          <Image  
            source={image}
            style={styles.imageCard}
          />
        </View>
        <View style={styles.containerTextCard}>
            <Text style={[styles.titleCard,{fontSize: titleSize}]}>{title}</Text>
            
              {description? <Text style={styles.descriptionCard}>{description}</Text> : <Link to={link? link : ''}>Link</Link>}
            
            
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  containerCard:{
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: colors.white,
    height: 190,
    alignItems: "center",
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10, 
    borderRadius: 12
  },
  imageCardContainer:{
    width: 80,
    height: 100,
    marginRight: 10,
    justifyContent: "center",
    alignItems: 'center'
  },
  imageCard:{
   height: 80,
   maxWidth: 70,
   resizeMode: "contain"
  },
  containerTextCard:{
    marginVertical: 10,
    maxHeight: 140,
    flex: 1,
  },
  titleCard:{
    textAlign: "center",
    fontSize: 18,
    color: colors.background,
    fontFamily: fonts.heading
  },
  descriptionCard:{
    textAlign: "center",
    fontSize: 11,
    color: colors.background,
    fontFamily: fonts.text
  }
})