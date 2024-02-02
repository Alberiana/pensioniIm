import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
      <Button title="Skano leternjoftimin" onPress={navigateToFaceIDScreen} />
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
