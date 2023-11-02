import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

function TermsScreen({ navigation }) {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAcceptance = () => {
    setIsAccepted(!isAccepted);
  };

  return (
    <View style={styles.container}>
      <Text>Termat dhe Kushtet</Text>
      {/* Add your terms and conditions text here */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          value={isAccepted}
          onValueChange={handleAcceptance}
        />
        <Text>I accept the terms and conditions</Text>
      </View>
      <Button
        title="Vazhdo"
        onPress={() => {
            if (isAccepted) {
              navigation.navigate('Login'); // Use the name of the screen/component you defined in your Stack.Navigator
            } else {
              alert('Vetem nese pranoni kushtet ju und te vazhdonime tutje!!');
            }
          }}
          
      />
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

export default TermsScreen;
