import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const FaceCaptureScreen  = ({ navigation, route }) => {
  const { userData, documentImage, documentBackImage } = route.params || {};
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [documentRecognized, setDocumentRecognized] = useState(false);
  const [error, setError] = useState(null);

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
        console.error('Error capturing photoooooooooooooo:', photo);
        setError('Error capturing photo. Please try again.');
        return;
      }

      const formData = new FormData();
      console.log('Before face:', formData);

      const faceBase64 = await convertToBase64(photo.uri);
      formData.append('face', {
        uri: faceBase64,
        type: 'image/jpeg',
        name: 'face.jpg',
      });

      // formData.append('face', photo.base64);
      console.log('Before documentBlob:', formData);

      const documentImageBase64 = await convertToBase64(documentImage);
      formData.append('document', {
        uri: documentImageBase64,
        type: 'image/jpeg',
        name: 'document.jpg',
      });

      console.log('Before documentbackBlob:', formData);

      const documentBackImageBase64 = await convertToBase64(documentBackImage);
      formData.append('documentBack', {
        uri: documentBackImageBase64,
        type: 'image/jpeg',
        name: 'documentBack.jpg',
      });
    
      // const documentBlob = await fetch(documentImage.uri).then((res) => res.blob());
      // if (!documentBlob) {
      //   console.error('Error fetching document image:', documentBlob);
      //   setError('Error fetching document image. Please try again.');
      //   return;
      // }

      // const documentBackBlob =await fetch(documentBackImage.uri).then((res)=>res.blob());
      // if(documentBackBlob){
      //   console.error('Error fetching document back image:', documentBlob);
      //   setError('Error fetching document back image. Please try again.');
      //   return;
      // }
      console.log('FormData:', formData);

      formData.append('profile', 'security_high');

      console.log('FormData:', formData);

      setLoading(true);
      const apiEndpoint = 'http://192.168.1.111:8083/faceVerification';
      const apiKey = 'WPxA9od6pDm2YH2djximFiN9l9OMZH9C';
      console.log('AFTER API:', formData);

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
        console.log('Response from server face verification:', responseBody);        
          if (response.ok) {
            const result = JSON.parse(responseBody);
            console.log('Verification Result:', result);

            if (result.isIdentical) {
              console.log('Face recognition passed!');
              setVerificationResult('Biometric verification passed!');
            } else {
              console.log('Face recognition failed.');
              setError('Biometric verification failed. Please try again.');
            }
        }else {
          console.log('Server error:', responseBody);
          setError('Server error. Please try again.');
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
          <View style={styles.buttonContainer}>
            <Button title="Capture" onPress={handleCapture} />
          </View>
        </View>
      )}
    </View>
  );  
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default FaceCaptureScreen;
