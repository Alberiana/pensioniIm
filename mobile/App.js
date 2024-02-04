import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/welcomeScreen';
import TermsScreen from './screens/termsScreen';
import LoginScreen from './screens/loginScreen';
import SignUpScreen from './screens/SignUpScreen';
import IDIdentificationScreen from './screens/idIdentification';
import BackIDCaptureScreen from './screens/backIdIdentification';
import FaceCaptureScreen from './screens/faceCaptureScreen';
import { name as IDIdentificationScreenName } from './app.json';
import { name as BaclIDIdentificationScreenName } from './app.json';



AppRegistry.registerComponent(IDIdentificationScreenName, () => App);
AppRegistry.registerComponent(BaclIDIdentificationScreenName, () => App);

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="SignUp" component={SignUpScreen} /> 
        <Stack.Screen name="IDIdentificationScreen" component={IDIdentificationScreen} /> 
        <Stack.Screen name="BackIDCaptureScreen" component={BackIDCaptureScreen} /> 
        <Stack.Screen name="FaceCaptureScreen" component={FaceCaptureScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
