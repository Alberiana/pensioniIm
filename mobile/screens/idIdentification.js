import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

const IDIdentificationScreen = ({ navigation }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
},[]);

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
      setLoading(true);
      try {
        const apiEndpoint = 'http://192.168.178.69:8083/processImage';
        const apiKey = 'TJGZSKRXUfWdLyNzkCDzzq7nSa8EhstV';

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {     
             'Authorization': `Bearer ${apiKey}`,
             'Content-Type': 'multipart/form-data', 
          },
          body: formData,
          timeout: 30000,
        });


        console.log('Response:', response);

      
        if (response.ok) {
          const result = await response.json();
          if (result && result.error) {
            console.error('API Error:', result.error);
            alert(`API Error: ${result.error.message}`);
          } else {
            // Handle the result as needed
            if (result && result.verification) {
              alert('Verification successful.');
            } else {
              console.log('Result or result.verification does not exist.');
            }
          }
        }
      } catch (error) {
        console.error('Error capturing image:', error);
         alert(`API Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
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
            <Text style={styles.text}>{loading ? 'Processing...' : 'Capture'}</Text>
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
