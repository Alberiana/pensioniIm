import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';

function LoginScreen({ navigation }) {
  const [idCard, setIdCard] = useState('');

  const checkCredentials = async () => {
    try {
      const response = await fetch('login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idCard }), 
      });

      // if (response.ok) {
      //   alert('Helloo'+ response); 
      //   navigation.navigate('IDIdentification'); 
      // } else {
      //   alert('ID card number is incorrect or not found in the database.'); 
      // }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); 
    }
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp'); 
  };

  return (
    <View style={styles.container}>
      <Text>Sheno numrin e leternjoftimit:</Text>
      <TextInput
        placeholder="Numri leternjoftimit"
        onChangeText={text => setIdCard(text)}
        value={idCard}
      />
      <Button title="Vazhdo" onPress={checkCredentials} />
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Nuk jeni i/e regjistruar? Regjistrohu</Text>
      </TouchableOpacity>
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
  signUpText: {
    marginVertical: 20,
    color: 'blue',
  },
});

export default LoginScreen;
