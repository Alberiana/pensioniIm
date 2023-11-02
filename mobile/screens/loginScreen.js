import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function LoginScreen({ navigation }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const checkCredentials = () => {
    const isCorrect = number === '1234567890' && name === 'John' && surname === 'Doe';
    if (isCorrect) {
      navigation.navigate('IDIdentification'); 
    } else {
      alert('Ju lutem kontrolloni edhe nje here te dhenat e shenuara!.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter your information:</Text>
      <TextInput
        placeholder="10-digit number"
        onChangeText={text => setNumber(text)}
        value={number}
      />
      <TextInput
        placeholder="Name"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="Surname"
        onChangeText={text => setSurname(text)}
        value={surname}
      />
      <Button title="Submit" onPress={checkCredentials} style={StyleSheet.buttonContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
    backgroundColor:'lightblue'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10, 
    left: 0,
    right: 0,
  },
});
export default LoginScreen;
