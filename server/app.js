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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
