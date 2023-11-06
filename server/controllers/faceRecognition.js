// Import necessary modules
const faceapi = require('face-api.js');
const canvas = require('canvas');
const fs = require('fs');
faceapi.env.monkeyPatch({ fetch: require('node-fetch') });

async function recognizeFaces() {
  // Load face-api.js models
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('models');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('models');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('models');

  // Load the image
  const image = await canvas.loadImage('path_to_your_image.jpg'); // Replace with the path to your image

  // Detect faces in the image
  const detections = await faceapi.detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceDescriptors();

  // Log the detected faces
  console.log(detections.length + ' faces found');
  detections.forEach((detection, i) => {
    console.log('Face', i + 1, 'Box:', detection.detection.box);
    console.log('Face', i + 1, 'Landmarks:', detection.landmarks.positions);
    console.log('Face', i + 1, 'Descriptor:', detection.descriptor);
  });
}

// Execute face recognition
recognizeFaces().catch(err => console.error(err));
