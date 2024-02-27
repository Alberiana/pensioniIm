import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

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
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (isAccepted) {
            navigation.navigate('Login');
          } else {
            alert('Vetem nese pranoni kushtet ju mund te vazhdoni me tutje!!');
          }
        }}
      >
        <Text style={styles.buttonText}>Vazhdoooo</Text>
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
    backgroundColor: 'gray',
  },
  buttonContainer: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1E0808',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default TermsScreen;
