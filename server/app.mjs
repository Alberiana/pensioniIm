import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());

app.post('/process-image', async (req, res) => {
  try {
    const { imageData } = req.body;

    const apiKey = 'T2lagfFOEqwzwTkI3xbAdyC2uNu90jBa';
    const apiEndpoint = 'https://api-eu.idanalyzer.com';
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey,
      },
      body: JSON.stringify({
        file_base64: imageData, 
      }),
    });

    const result = await response.json();
    console.log('Server Response:', result); // Log the response
    res.json(result);
  } catch (error) {
    console.error('Error processing image:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
