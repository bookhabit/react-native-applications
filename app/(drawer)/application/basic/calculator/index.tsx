import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { TextBox } from '@/components/atom/TextBox';
import { Button } from '@/components/form/Button';
import { Colors } from '@/constants/Colors';

export default function CalculatorScreen() {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const appendNumber = (number: string) => {
    if (newNumber) {
      setDisplay(number);
      setNewNumber(false);
    } else {
      if (display === '0') {
        setDisplay(number);
      } else {
        setDisplay(display + number);
      }
    }
  };

  const appendDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const setOperationHandler = (op: string) => {
    setFirstNumber(parseFloat(display));
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    const secondNumber = parseFloat(display);
    if (firstNumber !== null && operation && !isNaN(secondNumber)) {
      let result: number;
      switch (operation) {
        case '+':
          result = firstNumber + secondNumber;
          break;
        case '-':
          result = firstNumber - secondNumber;
          break;
        case '×':
          result = firstNumber * secondNumber;
          break;
        case '÷':
          result = secondNumber !== 0 ? firstNumber / secondNumber : 0;
          break;
        default:
          result = secondNumber;
      }
      setDisplay(result.toString());
      setOperation(null);
      setFirstNumber(null);
      setNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setOperation(null);
    setFirstNumber(null);
    setNewNumber(true);
  };

  const renderButton = (text: string, onPress: () => void, style?: any) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, style?.text]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      
      <View style={styles.buttons}>
        <View style={styles.row}>
          {renderButton('C', clear, styles.clearButton)}
          {renderButton('±', () => setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display))}
          {renderButton('%', () => setDisplay((parseFloat(display) / 100).toString()))}
          {renderButton('÷', () => setOperationHandler('÷'), styles.operatorButton)}
        </View>
        
        <View style={styles.row}>
          {renderButton('7', () => appendNumber('7'))}
          {renderButton('8', () => appendNumber('8'))}
          {renderButton('9', () => appendNumber('9'))}
          {renderButton('×', () => setOperationHandler('×'), styles.operatorButton)}
        </View>
        
        <View style={styles.row}>
          {renderButton('4', () => appendNumber('4'))}
          {renderButton('5', () => appendNumber('5'))}
          {renderButton('6', () => appendNumber('6'))}
          {renderButton('-', () => setOperationHandler('-'), styles.operatorButton)}
        </View>
        
        <View style={styles.row}>
          {renderButton('1', () => appendNumber('1'))}
          {renderButton('2', () => appendNumber('2'))}
          {renderButton('3', () => appendNumber('3'))}
          {renderButton('+', () => setOperationHandler('+'), styles.operatorButton)}
        </View>
        
        <View style={styles.row}>
          {renderButton('0', () => appendNumber('0'), styles.zeroButton)}
          {renderButton('.', appendDecimal)}
          {renderButton('=', calculate, styles.equalButton)}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    fontSize: 64,
    color: Colors.dark.text,
    fontWeight: '300',
  },
  buttons: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: Colors.dark.tint,
  },
  buttonText: {
    fontSize: 32,
    color: Colors.dark.text,
    fontWeight: '500',
  },
  operatorButton: {
    backgroundColor: Colors.primary,
  },
  clearButton: {
    backgroundColor: Colors.light.tint,
  },
  equalButton: {
    backgroundColor: Colors.primary,
  },
  zeroButton: {
    flex: 2,
  },
});
