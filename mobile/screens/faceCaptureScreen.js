import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const FaceCaptureScreen = ({ route }) => {
  const {userData} = route.params;

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
      let photo = await cameraRef.current.takePictureAsync();
      const uri = photo.uri;

      const formData = new FormData();

      const convertImageToBase64 = async (uri) => {
        try {
          const response = await fetch(uri);
          const blob = await response.blob();
      
          const reader = new FileReader();
          return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error('Error converting image to Base64:', error);
          throw error;
        }
      };
      
      const base64Image = await convertImageToBase64(uri); 
      const file = {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'face.jpg',
      };
  
      formData.append('face', file); 
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
        const apiEndpoint = 'http://10.180.32.159:8083/processImageFaceCapture';
        const apiKey = '9RFzA1DwdewRIscmeJzxpNZpFNh6Y7l2';

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'multipart/form-data',
          },
          body:  JSON.stringify({ file: base64Image }),
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
       {welcomeMessage ? (
        <Text>{welcomeMessage}</Text>
      ) : (
        <View style={styles.container}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            ratio="20:9"
            autoFocus="on"
          >
            {}
          </Camera>

          {error && <Text style={{ color: 'red' }}>{error}</Text>}

          <View>
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
});

export default FaceCaptureScreen;
