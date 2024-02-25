const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host:  'localhost',
  user: 'root',
  password: 'lqsym',
  database: 'pensioniIm',
  connectionLimit: 10,
});

async function saveUserData(firstName, lastName, age, dob, documentName, documentNumber, documentSide, internalId, countryFull, countryIso, expiry, daysToExpiry, mrz, optionalData, PersonalNo, sex, stateFull, stateShort) {
    try {
      const connection = await pool.getConnection();
      await connection.query('CALL userDataInsert_sp(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
        firstName, lastName, age, dob, documentName, documentNumber, documentSide, internalId, countryFull, countryIso, expiry, daysToExpiry, mrz, optionalData, PersonalNo, sex, stateFull, stateShort
      ]);
      connection.release();
      console.log('User data saved successfully');
      return { success: true, message: 'User data saved successfully' };
    } catch (error) {
      console.error('Error saving user data from server:', error);
      return { success: false, message: 'Error saving user data from server' };
    }
  }
  

module.exports = {
  saveUserData
};
