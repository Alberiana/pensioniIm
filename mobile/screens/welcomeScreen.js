import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mirë se erdhët në aplikacionin përmes te cilit mund të verifikoheni për të marrë pensionin tuajjj!!</Text>
      <Image style={styles.image} source={require('../images/getMoney.jpg' )} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Terms')}
      >
        <Text style={styles.buttonText}>Vazhdo</Text>
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
    backgroundColor: 'gray'
  },
  text: {
    fontSize: 25
  },
  buttonContainer: {
    backgroundColor: '#1E0808',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default WelcomeScreen;
