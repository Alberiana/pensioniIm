// const fetch = require('node-fetch'); // Remove this line
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 8083;

app.use(cors());

app.use(bodyParser.json());
const upload = multer();

app.post('/processImage',upload.single('image'), async (req, res) => {
  try {
    //const { imageData } = req.body;
    const file=req.file;
    if(!file){
      throw new Error('No file uploaded');
    }
    const apiKey = 'Rnr6WWhzM2GdKJ8MntkiYxI5H6UtsaXh'; 
    const apiEndpoint = 'https://api-eu.idanalyzer.com'; 

    const response = await axios.post(apiEndpoint, {
      file_base64: file.buffer.toString('base64'),
      apikey: apiKey,
    });

    console.log('Response data:', response.data);

    const result = response.data.result;
    res.json(result);
  } catch (error) {
    console.error('Error processing image:', error.message);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
