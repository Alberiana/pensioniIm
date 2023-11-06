const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('./utils/database.js'); // Import the sequelize instance
const router = require('./routes/routes.js');
const User = require('./models/user'); // Import the User model

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

// Your other required modules and server setup
// ...

// Your function to perform face recognition from image data
async function recognizeFacesFromImageData(imageData) {
  // Your face recognition code here
  // ...
}

app.post('/recognize-faces', async (req, res) => {
  try {
    const { imageData } = req.body; // Assuming image data is sent in the request body

    // Perform face recognition with the received image data
    // Replace this with your face recognition logic (using the imageData)

    // Example: After face recognition, you get recognizedUserData (replace this with your actual data)
    const recognizedUserData = {
      userId: 1,
      username: 'TestUser',
      // Other relevant recognized user data
    };

    // Save recognized user data to the MySQL database using Sequelize
    const User = require('./models/user'); // Replace with your user model

    const newUser = await User.create({
      userId: recognizedUserData.userId,
      username: recognizedUserData.username,
      // Map other recognized user data to your user model fields
    });

    res.json({ success: true, data: recognizedUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Face recognition process failed' });
  }
});

sequelize.sync({ alter: true }) // Sync the models with the database
  .then(() => {
      console.log('All models were synchronized successfully.');
  })
  .catch((err) => {
      console.error('An error occurred during synchronization:', err);
  });

// Ensure you use the existing sequelize instance for further operations
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Models synced with the database.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
