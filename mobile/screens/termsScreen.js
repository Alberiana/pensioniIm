import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

function TermsScreen({ navigation }) {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAcceptance = () => {
    setIsAccepted(!isAccepted);
  };

  return (
    <View style={styles.container}>
      <Text>Termat dhe Kushtet</Text>
      <Text>{'Te dhenat tuaja do te perdoren per perdorim te brendshem.'}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          value={isAccepted}
          onValueChange={handleAcceptance}
        />
        <Text>Une i pranoj Termat dhe Kushtet</Text>
      </View>
      <View>
      <Button style={styles.buttonContainer}
      onPress={() => {
        if (isAccepted) {
          navigation.navigate('Login'); // Use the name of the screen/component you defined in your Stack.Navigator
        } else {
          alert('Vetem nese pranoni kushtet ju mund te vazhdoni me tutje!!');
        }
      }}
      title="Vazhdoooo"
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
    backgroundColor:'#962121',
    marginTop:93,
    top:56,

  },
});

export default TermsScreen;
