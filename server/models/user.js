// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // Assuming you have a file for database connection setup

const User = sequelize.define('retirees', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idCard: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      faceID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Add other fields as needed for your user model
    });
    
    // Synchronize the model with the database (if not using migrations)
    User.sync(); 
    
    module.exports = User;