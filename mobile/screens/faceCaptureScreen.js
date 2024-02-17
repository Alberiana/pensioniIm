import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

// Define the convertImageToBase64 function if not already defined
const convertImageToBase64 = async (uri) => {
  // Implementation of the function
};

const FaceCaptureScreen = ({ navigation, route }) => {
  const { userData } = route.params;
  const { documentImage } = route.params; // For front image
  const { documentBackImage } = route.params; // For back image
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');

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
      prevType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );

  const handleCapture = async () => {
    if (cameraRef.current && !loading) {
      let photo = await cameraRef.current.takePictureAsync();
      const uri = photo.uri;
       console.log('Photo captured:', photo);
        // Create formData
        const formData = new FormData();
        const file = {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'face.jpg',
        };

        // Append data to formData
        formData.append('face', file);
        formData.append('documentImage', documentImage);
        formData.append('documentBackImage', documentBackImage);
        formData.append('biometric_threshold', 0.6);
        formData.append('return_confidence', true);
        formData.append('aml_check', true);
        formData.append('aml_database', 'us_ofac');
        formData.append('dualsidecheck', true);
        formData.append('return_confidence', true);
        formData.append('authenticate', true);
        formData.append('verify_expiry', true);

        setLoading(true);
        try {
           

          const apiEndpoint = 'http://192.168.178.69:8083/processImage';
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
          } else {
            console.log('ERRORRRRR!');
          }
        } catch (error) {
          console.error('Error capturing image:', error);
          setError('Error capturing image. Please try again.');
        } finally {
          setLoading(false);
        }
    }else {
      console.log('Camera is not running');
      setError('Camera is not running. Please make sure the camera is ready.');
    }
  };

  return (
    <View style={styles.container}>
      {cameraPermission === null ? (
        <Text>Requesting camera permission...</Text>
      ) : cameraPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={styles.container}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            ratio="16:9"
            autoFocus="on"
            onCameraReady={() => console.log('Camera is ready')}
            />
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            <View style={styles.buttonContainer}>
              <Button title="Capture" onPress={handleCapture} />
            </View>
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
    flex: 1,
  },
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
