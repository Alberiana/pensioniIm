const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'your_mysql_host',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.stack);
    return;
  }
  console.log('Connected to database');
});

app.use(bodyParser.json());

app.post('/saveUserData', (req, res) => {
  const { screen, data } = req.body;

  if (screen && data) {
    saveUserData(data, res);
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
});

function saveUserData(data, res) {
  const { firstName, lastName } = data;
  const query = 'INSERT INTO user_data (firstName, lastName) VALUES (?, ?)';
  db.query(query, [firstName, lastName], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
