import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/welcomeScreen';
import TermsScreen from './screens/termsScreen';
import LoginScreen from './screens/loginScreen';
const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
