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
        body: JSON.stringify({ idCard }), // Send the ID card to the server for validation
      });

      if (response.ok) {
        // Successfully authenticated
        alert('Helloo'+ response); 
        navigation.navigate('IDIdentification'); // Navigate to the next screen upon successful authentication
      } else {
        alert('ID card number is incorrect or not found in the database.'); // Show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); // Show an error message if something went wrong
    }
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the sign-up screen
  };

  return (
    <View style={styles.container}>
      <Text>Enter your ID card number:</Text>
      <TextInput
        placeholder="ID card number"
        onChangeText={text => setIdCard(text)}
        value={idCard}
      />
      <Button title="Submit" onPress={checkCredentials} />
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
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
