// const fetch = require('node-fetch'); // Remove this line
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8083;

app.use(cors());

app.use(bodyParser.json());


app.post('/processImage', async (req, res) => {
  try {
    const { imageData } = req.body;
    const apiKey = 'zDgssgiVKpLYnC5yu9idppO8BdRvBeJM'; 
    const apiEndpoint = 'https://api-eu.idanalyzer.com'; 
    const response = await axios.post(apiEndpoint, {
      file_base64: imageData,
      apikey: apiKey,
    });

    console.log('Response:', response);

    const result = response.data;
    res.json(result);
  } catch (error) {
    console.error('Error processing image:', error.message);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
