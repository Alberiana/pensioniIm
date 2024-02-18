import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

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

  const handleCapture = async () => {
    if (cameraRef.current && !loading) {
      let photo = await cameraRef.current.takePictureAsync();

      console.log('documentImage:', documentImage);
      console.log('documentBackImage:', documentBackImage);
      if (!photo || !photo.uri) {
        console.error('Error capturing photo:', photo);
        setError('Error capturing photo. Please try again.');
        return;
      }
      const uri = photo.uri;

      const formData = new FormData();
      formData.append('face', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'face.jpg',
      });
      formData.append('document', {
        uri: documentImage.uri,
        type: 'image/jpeg',
        name: 'document.jpg',
      });

      formData.append('documentBack', {
        uri: documentBackImage.uri,
        type: 'image/jpeg',
        name: 'documentBack.jpg',
      });
      
      formData.append('profile', 'security_high');
  

      setLoading(true);
      try {
        const apiEndpoint = 'http://192.168.178.69:8083/faceVerification';
        const apiKey = 'jScatYPNZWFjYsnac3JyDDRe4ncyp1zc';

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
          timeout: 10000,
        });

        const responseBody = await response.text(); // Store the response text
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
          console.log('Its not OK!');
        }
      } catch (error) {
        console.error('Error capturing image:', error);
        setError('Error capturing image. Please try again.');
      } finally {
        setLoading(false);
      }
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
