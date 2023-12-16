import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

const IDIdentificationScreen = ({ navigation }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const handleFlipCamera = () => setType((prevType) =>
    prevType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
  );

  const handleCapture = async () => {
    if (cameraRef.current && !loading) {
      let photo = await cameraRef.current.takePictureAsync();
      const base64ImageData = photo.base64;
      setLoading(true);
      try {
        const apiEndpoint = 'https://api-eu.idanalyzer.com';
        const apiKey = 'E6gTlXNVbMZN2yQTzVoQXqPqCVNRSSem'; 
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey,
          },
          body: JSON.stringify({ imageData: base64ImageData }),
        });
      
        const result = await response.json();
      
        if (response.ok) {
          console.log('Successful response:', result);
      
          if (result && result.verification) {
            alert('result or result.verification exists.');
          } else if (result && result.error) {
            console.error('API Error:', result.error);
            alert(`API Error: ${result.error.message}`);
          }else {
            console.log('Result or result.verification:', result);
            alert('result or result.verification does not exist.');
          }
        } else {
          console.error('API Error:', result);
          alert('Failed to process image. Please check the console for more details.');
        }
      } catch (error) {
        console.error('Network Error:', error); // Log detailed network error information
        alert('An error occurred. Please check the console for more details.');
      }
      
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        ratio="20:9"
        autoFocus="on"
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleFlipCamera}>
            <Text style={styles.text}>Kthe kameren</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCapture}>
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
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
