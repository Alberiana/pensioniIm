import React from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mirë se erdhët në aplikacionin përmes te cilit mund të verifikoheni për të marrë pensionin tuaj!!</Text>
      <Image style={styles.image} source={require('../images/getMoney.jpg' )} />
      <View style={[styles.buttonContainer, { backgroundColor: '#1E0808' }]}>
         <Button
         title="Vazhdo"
         onPress={() => navigation.navigate('Terms')}
         color="#0E0909" // Set text color for the button
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
    backgroundColor:'gray'
  },
  text:{
    fontSize:25
  },
  button:{
    backgroundColor:'#1E0808',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10, 
    left: 0,
    right: 0,
    backgroundColor:'#1E0808',
    marginLeft:23,
    marginRight:23,
    marginBottom:53,
    borderRadius:20,
  },
  image:{
    width: 200, 
    height: 200,
    marginVertical: 10, 
  },
});

export default WelcomeScreen;
