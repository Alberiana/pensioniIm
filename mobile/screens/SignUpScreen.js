import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function SignUpScreen({ navigation }) {
  const [idCard, setIdCard] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const navigateToFaceIDScreen = () => {
    // if (idCard && name && surname) {
    navigation.navigate('IDIdentificationScreen');
    // } else {
    // alert('Ju lutem plotesoni te gjitha fushat.');
    //}
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={navigateToFaceIDScreen}>
        <Text style={styles.buttonText}>Fotografo leternjoftimin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'gray', // Set background color to gray
  },
  button: {
    backgroundColor: '#1E0808', // Set button background color to #1E0808
    padding: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
  },
});

export default SignUpScreen;
