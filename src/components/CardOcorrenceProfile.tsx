import React from 'react';
import { Alert, Animated, Image, StyleSheet, View } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Trash from '../image/profile/trash.png'

import colors from '../Styles/colors';
import { DataCategoryProps } from '../hooks/useOcorrence';
import { CardOcorrencePrimary } from './CardOcorrencePrimary';

interface CardOcorrenceProps extends RectButtonProperties {
  data: DataCategoryProps,
  index: number,
  deleteOcorrence(): void
  onClick(): void
}

export function CardOcorrenceSegundary({ data, index, deleteOcorrence, onClick, ...rest }: CardOcorrenceProps) {

  function handleDelete(params: DataCategoryProps) {
    Alert.alert("Remover", `Deseja remover a esse ${params.category == 'residencial' ? 'Furto ' + params.category : params.category == 'veiculo' ? 'Roubo de ' + params.category : params.category}`, [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async function () {
          try {
            deleteOcorrence()

          } catch (error) {

            Alert.alert('Não foi possivel Remover!')
          }
        },
      },
    ])

  }

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={() => handleDelete(data)}
              {...rest}
            >
              <Image source={Trash} style={styles.imageTrash} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <CardOcorrencePrimary
        data={data}
        index={index}
      />
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  buttonRemove: {
    width: 150,
    height: 130,
    backgroundColor: colors.red,
    marginTop: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    right: 30,
    paddingLeft: 15,
  },
  imageTrash: {
    height: 40,
    width: 28.58
  }

})

