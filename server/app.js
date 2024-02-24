const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 8083;
//const storage = multer.memoryStorage();
const upload = multer();
app.use(cors());

app.use(bodyParser.json());
const apiEndpoint = 'https://api2.idanalyzer.com/scan';
const apiEndpointFace = 'https://api2.idanalyzer.com/face';

const apiKey = 'vmQkOcA1EJLCyBEC2AOQqD9WTuUb8xI8';

app.post('/processImage', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      throw new Error('No file uploaded');
    }    
    const response = await axios.post(apiEndpoint, {
      document: file.buffer.toString('base64'),
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
    });
    
    const formattedData = extractData(response.data.data);

    console.log('Original Response data:', response.data);
   const result={
    ...response.data.result,
    data:formattedData,
   };
    
    console.log('Formatted Response data:', result);

    console.log('Response statussss:', response.status);
    res.json(result);
    } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
  
});


function extractData(data){
  const formattedData={};
  Object.keys(data).forEach(key=>{
    if(Array.isArray(data[key])&& data[key].length===1 && typeof data[key][0]==='object'){
      formattedData[key]=data[key][0].value;
    }else{
      formattedData[key]=data[key];
    }
  });
  return formattedData;
}


app.post('/faceVerification', upload.fields([
  { name: 'document', maxCount: 1 },
  { name: 'documentBack', maxCount: 1 },
  { name: 'face', maxCount: 1 },
]), async (req, res) => {
  try {
    if (!req.files) {
      console.error('REQ file missing in the request.');
      return res.status(400).send('Bad Request: Req file missing.');
    } else if (!req.files['document']) {
      console.error('DOCUMENT missing in the request.');
      return res.status(400).send('Bad Request: DOCUMENT missing.');
    } else if (!req.files['documentBack']) {
      console.error('documentBack missing in the request.');
      return res.status(400).send('Bad Request: documentBack missing.');
    } else if (!req.files['face']) {
      console.error('face files missing in the request.');
      return res.status(400).send('Bad Request: face files missing.');
    }

    const { document, documentBack, face } = req.files;
    if (!document || !documentBack || !face) {
      console.error('Required files missing in the request. ');
      return res.status(400).send('Bad Request: Required files missing. ');
    }


    const documentBase64 = document[0].buffer.toString('base64');
    //console.error('documentBase64: ', documentBase64);

    const documentBackBase64 = documentBack[0].buffer.toString('base64');
    //console.error('documentBackBase64: ', documentBackBase64);

    const faceBase64 = face[0].buffer.toString('base64');
   // console.error('faceBase64: ', faceBase64);

    const data = {
      document: documentBase64,
      documentBack: documentBackBase64,
      face: faceBase64,
      profile: 'security_high'
    }

    const response = await axios.post('https://api2.idanalyzer.com/scan', data,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
    });

    const apiResponse = await response.data;
    const formattedData = extractData(apiResponse.data);

    console.log('Original Response data:', apiResponse);
    console.log('Formatted Response data:', formattedData);

    res.send(formattedData);
  } catch (error) {
    console.error('Error processing request: ', error);
    res.status(500).send('Internal Server Error');
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
