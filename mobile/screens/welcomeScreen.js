// WelcomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mire se erdhet ne aplikacionin ku mund te verifikoheni per te marre pensionin tuaj!!</Text>
      <Image style={styles.image} source={require('../images/getMoney.jpg' )} />
      <View style={styles.buttonContainer}>
        <Button style={styles.button}
          title="Vazhdoooo"
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
  text:{
    fontSize:25
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10, 
    left: 0,
    right: 0,
    backgroundColor:'#662121',
    marginLeft:23,
    marginRight:23,
    marginBottom:53,
    borderRadius:20,
  },
  image:{
    width: 200, // Set the width as needed
    height: 200, // Set the height as needed
    marginVertical: 10, // Adjust margin as needed
  },
  // button:{
  //   color:'#662121',
  // },
});

export default WelcomeScreen;
