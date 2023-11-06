import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function SignUpScreen({ navigation }) {
  const [idCard, setIdCard] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const navigateToFaceIDScreen = () => {
    if (idCard && name && surname) {
      navigation.navigate('IDIdentificationScreen');
    } else {
      alert('Please fill in all the details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="ID card number"
        onChangeText={text => setIdCard(text)}
        value={idCard}
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
      <Button title="Go to Face ID" onPress={navigateToFaceIDScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'lightblue',
  },
});

export default SignUpScreen;
