import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const IDIdentificationScreen = ({ navigation  }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [documentRecognized, setDocumentRecognized] = useState(false);
  const [error, setError] = useState(null);



  const saveUserData = async (userData) => {
    try {
      console.log('Sendingggggg user data:', userData); // Log the userData object

      const apiEndpoint = 'http://192.168.195.102:8083/saveUserData';
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData ),
            });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User data saved: ', data);
      } else {
        const errorText = await response.text();
        console.error('Error saving user data: ', errorText);
      }
  
    } catch (error) {
      console.error('Error saving user data: ', error);
    }
  };
  
  

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(status === 'granted');
      } catch (error) {
        console.error('Error requesting camera permission:', error);
      }
    };
    requestCameraPermission();
  }, []);

  const handleFlipCamera = () =>
    setType((prevType) =>
      prevType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );

  const handleCapture = async () => {
    if (cameraRef.current && !loading) {
      let photo = await cameraRef.current.takePictureAsync();
      const uri = photo.uri;

      const formData = new FormData();
      formData.append('image', {
        uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('return_confidence', true);
      formData.append('aml_check', true);
      formData.append('aml_database', 'us_ofac');
      formData.append('dualsidecheck', true);
      formData.append('return_confidence', true);
      formData.append('authentication', true);
      formData.append('verify_expiry', true);

      setLoading(true);
      try {
        const apiEndpoint = 'http://192.168.195.102:8083/processImage';
        const apiKey = '6tpjn3a7P9MYkGirp9MQj2ZexR7B3eJA';
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-API-KEY': apiKey,
          },          
          body: formData,
          timeout: 10000,
        });

        const responseBody = await response.text();

        try {
          const parsedResponse = JSON.parse(responseBody);      
          if (response.ok) {
            console.log('Result:', parsedResponse);
            console.log('Result:', parsedResponse.data.firstName);
            console.log('Result:', parsedResponse.data.lastName);
            console.log('Result:', parsedResponse.data.age);
            console.log('Result:', parsedResponse.data.documentName);
            console.log('Result:', parsedResponse.data.documentNumber);
            console.log('Result:', parsedResponse.data.documentSide);
            console.log('Result:', parsedResponse.data.internalId);
            console.log('Result:', parsedResponse.data.countryFull);
            console.log('Result:', parsedResponse.data.countryIso);
            console.log('Result:', parsedResponse.data.expiry);
            console.log('Result:', parsedResponse.data.daysToExpiry);
            console.log('Result:', parsedResponse.data.optionalData);
            console.log('Result:', parsedResponse.data.sex);
            console.log('Result:', parsedResponse.data.stateFull);
            console.log('Result:', parsedResponse.data.stateShort);

            const userData = {
              firstName: parsedResponse.data.firstName || '',
              lastName: parsedResponse.data.lastName || '',
              age: parsedResponse.data.age || '',
              dob: parsedResponse.data.dob || '',
              documentName: parsedResponse.data.documentName || '',
              documentNumber: parsedResponse.data.documentNumber || '',
              documentSide: parsedResponse.data.documentSide || '',
              internalId: parsedResponse.data.internalId || '',
              countryFull: parsedResponse.data.countryFull || '',
              countryIso: parsedResponse.data.countryIso || '',
              expiry: parsedResponse.data.expiry || '',
              daysToExpiry: parsedResponse.data.daysToExpiry || '',
              optionalData: parsedResponse.data.optionalData || '',
              sex: parsedResponse.data.sex || '',
              stateFull: parsedResponse.data.stateFull || '',
              stateShort: parsedResponse.data.stateShort || '',
            };
  
            console.log('Sending user data:', userData);
            await saveUserData(userData);

          } else {
            console.error('Error response from server:', parsedResponse);
          }
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
        }

        navigation.navigate('BackIDCaptureScreen', {
          userData: userData,
          documentImage: uri,
        });

      } catch (error) {
        console.error('Error capturing image:', error);
        setError(`Error capturing image: ${error.message}`);      
      } finally {
        setLoading(false);
      }
    }
  };

  const back = () => {
    navigation.navigate('BackIDCaptureScreen');
  };

  return (
    <View>
      {documentRecognized ? (
        <View>
          <Text>{`Welcome, ${userData.firstName} ${userData.lastName}! Registration successful.`}</Text>
          <Button title="Go to Back ID Scanner" onPress={back} />
        </View>
      ) : (
        <View>
          <Camera
            ref={cameraRef}
            style={{ width: '100%', height: '80%' }}
            type={type}
            ratio="20:9"
            autoFocus="on"
          >
          </Camera>

          {error && <Text style={{ color: 'red' }}>{error}</Text>}

          <Button title="Capture" onPress={handleCapture} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginHorizontal: 10,
  },
  text: {
    color: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default IDIdentificationScreen;
