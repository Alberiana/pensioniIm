import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

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
      <Text style={styles.title}>Sheno numrin e leternjoftimit:</Text>
      <TextInput 
       style={styles.input} 
        placeholder="Numri leternjoftimit"
        onChangeText={text => setIdCard(text)}
        value={idCard}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={checkCredentials}
      >
        <Text style={styles.buttonText}>Vazhdo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Nuk jeni i/e regjistruar? Regjistrohu(Kliko ketu)</Text>
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
    backgroundColor: 'gray', // Set background color to gray
  }, 
  input: {
    fontSize: 18, // Set font size to 18
    width: '80%', // Set width to 80% of parent
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20, // Set font size to 20
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1E0808', // Set button background color to #1E0808
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  signUpText: {
    marginVertical: 20,
    color: '#FFFFFF',
  },
});

export default LoginScreen;
