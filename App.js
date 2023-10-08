import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/welcomeScreen';
import TermsScreen from './screens/termsScreen';
import LoginScreen from './screens/loginScreen';
import IDIdentificationScreen from './screens/idIdentification';
import { name as IDIdentificationScreenName } from './app.json';
AppRegistry.registerComponent(IDIdentificationScreenName, () => App);

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="IDIdentification" component={IDIdentificationScreen} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
