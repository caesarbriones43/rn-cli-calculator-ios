import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../theme/appTheme';
import BotonCalc from '../components/BotonCalc';

import {useCalculadora} from '../hooks/useCalculadora';

const CalculadoraScreen = () => {
  const {
    numeroAnterior,
    numero,
    armarNumero,
    clearScreen,
    changeSign,
    calcular,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
  } = useCalculadora();

  return (
    <View style={styles.calculadoraContainer}>
      {numeroAnterior !== '0' && (
        <Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>
      )}
      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>
      {/* Fila de Botones */}
      <View style={styles.fila}>
        <BotonCalc title="C" color="#9B9B9B" onPress={clearScreen} />
        <BotonCalc title="+/-" color="#9B9B9B" onPress={changeSign} />
        <BotonCalc title="<-" color="#9B9B9B" onPress={btnDelete} />
        <BotonCalc title="/" color="#FF9427" onPress={btnDividir} />
      </View>
      {/* Fila de Botones */}
      <View style={styles.fila}>
        <BotonCalc title="7" onPress={armarNumero} />
        <BotonCalc title="8" onPress={armarNumero} />
        <BotonCalc title="9" onPress={armarNumero} />
        <BotonCalc title="X" color="#FF9427" onPress={btnMultiplicar} />
      </View>
      {/* Fila de Botones */}
      <View style={styles.fila}>
        <BotonCalc title="4" onPress={armarNumero} />
        <BotonCalc title="5" onPress={armarNumero} />
        <BotonCalc title="6" onPress={armarNumero} />
        <BotonCalc title="-" color="#FF9427" onPress={btnRestar} />
      </View>
      {/* Fila de Botones */}
      <View style={styles.fila}>
        <BotonCalc title="1" onPress={armarNumero} />
        <BotonCalc title="2" onPress={armarNumero} />
        <BotonCalc title="3" onPress={armarNumero} />
        <BotonCalc title="+" color="#FF9427" onPress={btnSumar} />
      </View>
      {/* Fila de Botones */}
      <View style={styles.fila}>
        <BotonCalc title="0" ancho onPress={armarNumero} />
        <BotonCalc title="." onPress={armarNumero} />
        <BotonCalc title="=" color="#FF9427" onPress={calcular} />
      </View>
    </View>
  );
};

export default CalculadoraScreen;
