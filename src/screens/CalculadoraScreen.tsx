import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../theme/appTheme';
import BotonCalc from '../components/BotonCalc';

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

const CalculadoraScreen = () => {
  const [numero, setNumero] = useState('0');
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const ultimaOperacion = useRef<Operadores>();

  const clearScreen = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const armarNumero = (numeroTexto: string) => {
    //double point
    if (numero.includes('.') && numeroTexto === '.') {
      return;
    }

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      //decimal point
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);
      }
      //evaluar si es otro 0 o hay otro punto
      else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);
      }
      //0 != numero y no hay .
      else if (numeroTexto != '0' && !numero.includes('.')) {
        setNumero(numeroTexto);
      }

      //evitar 0000.00
      else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const changeSign = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const btnDelete = () => {
    let negativo = '';
    let numeroTemporal = numero;
    if (numero.includes('-')) {
      negativo = '-';
      numeroTemporal = numero.substr(1);
    }

    if (numeroTemporal.length > 1) {
      setNumero(negativo + numeroTemporal.slice(0, -1));
    } else {
      setNumero('0');
    }
  };

  const CambiarNumPorAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDividir = () => {
    CambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };
  const btnMultiplicar = () => {
    CambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };
  const btnRestar = () => {
    CambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  };
  const btnSumar = () => {
    CambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };
  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${num1 + num2} `);
        break;
      case Operadores.restar:
        setNumero(`${num2 - num1} `);
        break;
      case Operadores.multiplicar:
        setNumero(`${num1 * num2} `);
        break;
      case Operadores.dividir:
        setNumero(`${num1 / num2} `);
        break;
    }
    setNumeroAnterior('0');
  };

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
