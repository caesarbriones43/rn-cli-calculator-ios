import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  title: string;
  color?: string;
  ancho?: boolean;
  onPress: (numeroTexto: string) => void;
}

const BotonCalc = ({
  title,
  color = '#2D2D2D',
  ancho = false,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(title)}>
      <View
        style={{
          ...styles.boton,
          backgroundColor: color,
          width: ancho ? 180 : 80,
        }}>
        <Text
          style={{
            ...styles.botonTexto,
            color: color === '#9B9B9B' ? 'black' : 'white',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  botonTexto: {
    textAlign: 'center',
    color: 'black',
    fontSize: 30,
    padding: 10,
    fontWeight: '300',
  },
});

export default BotonCalc;
