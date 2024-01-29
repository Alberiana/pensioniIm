const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 8083;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors());

app.use(bodyParser.json());
const apiEndpoint = 'https://api2.idanalyzer.com/scan';
const apiEndpointFace = 'https://api2.idanalyzer.com/face';

const apiKey = '2kzKbFbhX1vKaCJ7Z1sbQnvJnV5MCkDZ';

app.post('/processImage', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      throw new Error('No file uploaded');
    }    
    const response = await axios.post(apiEndpoint, {
      file_base64: file.buffer.toString('base64'),
      apikey: apiKey,
    });

    console.log('Response data:', response.data);

    const result = response.data.result;
    // Add the following lines after the axios.post() call in both endpoints

    console.log('Response headers:', response.headers);
    console.log('Response status:', response.status);

    res.json(result);
  } catch (error) {
    console.error('Error processing image:', error.message);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});


app.post('/processImageFaceCapture', async (req, res) => {
  console.log('Request body:', req.body); 

  try {
    const { file } = req;
    if (!file) {
      throw new Error('No face data found');
    } 

    const response = await axios.post(apiEndpointFace, {
      file: file.buffer.toString('base64'),
      apikey: apiKey,
    });

    console.log('Response data:', response.data);

    const result = response.data;

    const responseBody = {
      result: result.result,
      confidence: result.confidence,
      face: result.face,
      verification: result.verification,
      authentication: result.authentication,
      aml: result.aml,
      contract: result.contract,
      vaultid: result.vaultid,
      matchrate: result.matchrate,
      executionTime: result.executionTime,
      responseID: result.responseID,
      quota: result.quota,
      credit: result.credit,
    };

    res.json(responseBody);

  } catch (error) {
    console.error('Error processing face capture image:', error.message);
    res.status(500).json({ error: `Internal Server Error for face capture: ${error.message}` });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
