import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const FaceCaptureScreen = ({navigation, route }) => {
  const { userData } = route.params;
  const { documentBackImage } = route.params;
  const { documentImage } = route.params;
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

  const handleFlipCamera = () => setType((prevType) =>
    prevType === Camera.Constants.Type.front
      ? Camera.Constants.Type.back
      : Camera.Constants.Type.front
  );

  const handleCapture = async () => {
    if (cameraRef.current && !loading) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        console.log('Photo captured:', photo);
        // Rest of the code for handling capture...
      } catch (error) {
        console.error('Error capturing photo:', error);
        setError('Error capturing photo. Please try again.');
      }
    }
      
      const base64Image = await convertImageToBase64(uri); 
      const file = {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'face.jpg',
      };
  
      formData.append('face', file); 
      formData.append('documentImage', documentImage);
       // Append documentBackImage to formData
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
        const apiEndpoint = 'http://10.180.38.1:8083/processImage';
        const apiKey = '9RFzA1DwdewRIscmeJzxpNZpFNh6Y7l2';

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
        }else{
            console.log('ERRORRRRR!');
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
