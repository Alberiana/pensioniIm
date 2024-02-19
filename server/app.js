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

const apiKey = 'rfEa3UP1yxmXrf6J90t9wxGVQ4sZy7OK';

app.post('/processImage', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      throw new Error('No file uploaded');
    }    
    const response = await axios.post(apiEndpoint, {
      document: file.buffer.toString('base64'), // Assuming document is the key for the document image
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
]), (req, res) => {

  if (!req.files )
  {  
    console.error('REQ file missing in the request.');
    return res.status(400).send('Bad Request: Req file missing.');

  }else if(!req.files['document']){

   console.error('DOCUMENT missing in the request.');
   return res.status(400).send('Bad Request: DOCUMENT missing.');

  }else if(!req.files['documentBack'] ){
    console.error('documentBack missing in the request.');
    return res.status(400).send('Bad Request:documentBack missing.');
  }else if(!req.files['face']) {
    console.error('face files missing in the request.');
    return res.status(400).send('Bad Request: face files missing.');
  }

  const documentImage = req.files['document'][0];
  const documentBackImage = req.files['documentBack'][0];
  const faceImage = req.files['face'][0];

  console.error('documentImage: ',documentImage);

  const documentBase64 = documentImage.buffer.toString('base64');
  console.error('documentBase64: ',documentBase64);

  const documentBackBase64 = documentBackImage.buffer.toString('base64');
  const faceBase64 = faceImage.buffer.toString('base64');

  const data = {
    document: documentBase64,
    documentBack: documentBackBase64,
    face: faceBase64,
}
fetch('https://api2.idanalyzer.com/scan', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-API-KEY': apiKey,
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(apiResponse => {
  console.log(apiResponse);
  res.send(apiResponse); 
})
.catch(error => {
  console.error(error);
  res.status(500).send('Internal Server Error'); // Handle API request error
});

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
