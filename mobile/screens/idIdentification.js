import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const IDIdentificationScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const handleFlipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      // 'photo' will contain the captured image data, you can process it further here.
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        ratio="16:9"
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
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default IDIdentificationScreen;
