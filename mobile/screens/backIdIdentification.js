import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const BackIDCaptureScreen = ({ navigation }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
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
      formData.append('dualsidecheck', 'true');
      formData.append('return_confidence', 'true');
      formData.append('authenticate', 'true');
      formData.append('verify_expiry', 'true');

      setLoading(true);
      try {
        const apiEndpoint = 'http:///10.180.41.182:8083/processImage';
        const apiKey = 'FlzzLXDAApdNm5x4nOYqRTqFKanAEsKG';

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

        console.log('Response from server back id:', responseBody);
        if (response.ok) {

          const result = JSON.parse(responseBody);
          console.log('Result back id:', result);
          const { firstName, lastName } = result;

          if (result.error) {
            console.error('Document not recognized:', result.error.message);
            setError('Document not recognized. Please try again.');
          } else {
            console.log('Back of the document recognized successfully!');
            setUserData({ firstName, lastName });
            setDocumentRecognized(true);
          }
          
        }
      } catch (error) {
        console.error('Error capturing image:', error);
        setError('Error capturing image. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const faceCapture=()=>{
    navigation.navigate('FaceCaptureScreen');
  };
  return (
    <View>
      {documentRecognized ? (
        <View>
          <Button title="Face Capture" onPress={faceCapture}/>
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

          <View style={styles.buttonContainer}>
            <Button title="Shkrep" onPress={handleCapture} />
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

export default BackIDCaptureScreen;
