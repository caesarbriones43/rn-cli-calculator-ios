import {useState, useRef} from 'react';
//own hook

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const useCalculadora = () => {
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

  return {
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
  };
};
