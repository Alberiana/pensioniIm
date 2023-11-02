// WelcomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Mire se erdhet ne aplikacionin ku mund te verifikoheni per te marre pensionin tuaj!!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Vazhdo"
          onPress={() => navigation.navigate('Terms')}
        />
      </View>
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

export default WelcomeScreen;
