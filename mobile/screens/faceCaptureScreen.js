import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const FaceCaptureScreen  = ({ navigation, route }) => {
  const { documentImage, documentBackImage } = route.params || {};
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [documentRecognized, setDocumentRecognized] = useState(false);
  const [error, setError] = useState(null);
  const apiEndpoint = 'http://192.168.195.102:8083/faceVerification';
  const apiKey = '9l9f88TBXNAHXRIN9WRzwKDvRcm1K18J';
  const [userData, setUserData]= useState(null);


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

  const handleFlipCamera = () => setType((prevType) =>
    prevType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
  );

  const convertToBase64 = async (uri) => {
    console.log('URI:', uri);
    try {
      if (!uri) {
        console.error('Invalid URI:', uri);
        return null;
      }
  
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };


  const handleCapture = async () => {

  try{
    if (cameraRef.current && !loading) {
      let photo = await cameraRef.current.takePictureAsync();

      console.log('documentImage:', documentImage);
      console.log('documentBackImage:', documentBackImage);
      console.log('Photo uri:', photo.uri);

      if (!photo || !photo.uri) {
        console.error('Error capturing photo:', photo);
        setError('Error capturing photo. Please try again.');
        return;
      }

      const formData = new FormData();

      const faceBase64 = await convertToBase64(photo.uri);
      formData.append('face', {
        uri: faceBase64,
        type: 'image/jpeg',
        name: 'face.jpg',
      });

      const documentImageBase64 = await convertToBase64(documentImage);
      formData.append('document', {
        uri: documentImageBase64,
        type: 'image/jpeg',
        name: 'document.jpg',
      });

      const documentBackImageBase64 = await convertToBase64(documentBackImage);
      formData.append('documentBack', {
        uri: documentBackImageBase64,
        type: 'image/jpeg',
        name: 'documentBack.jpg',
      });
      formData.append('profile', 'security_medium');
      formData.append('profileId', 'security_medium');

      setLoading(true);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'multipart/form-data',
        },          
        body: formData,
        timeout: 30000,

      });

        const responseBody = await response.text(); 
        const { firstName, lastName } = JSON.parse(responseBody);
        console.log('Response from server face verification:', responseBody);        
          if (response.ok) {
            console.log('Verification Result:', responseBody);
            navigation.navigate('MainScreen', { firstName, isVerified: true });
          }else {
            console.log('Server error:', responseBody);
            setError('Server error. Please try again.');
            navigation.navigate('MainScreen', { firstName, isVerified: false });
        }
      }
    } catch (error) {
        console.error('Error capturing image:', error);
      setError('Error capturing image. Please try again.');
      } finally {
        setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {cameraPermission === null ? (
        <Text>Requesting camera permission...</Text>
      ) : cameraPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            ref={cameraRef}
            style={{ flex: 1 }}
            type={type}
            ratio="16:9"
            autoFocus="on"
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleCapture}
          >
            <Text style={styles.buttonText}>FOTOGRAFO FYTYREN</Text>
          </TouchableOpacity>
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
    backgroundColor: '#1E0808',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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

export default FaceCaptureScreen;
