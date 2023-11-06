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
        validate: {
            notEmpty: true,
            len: [8, 20] // Example: Minimum 8, maximum 20 characters
            // Add other validations as needed
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50] // Example: Minimum 2, maximum 50 characters
        }
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50] // Example: Minimum 2, maximum 50 characters
        }
    },
    faceID: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
            // Add other validations as needed
        }
    },
    // Add other fields as needed for your user model
});

// Class method to find a user by their ID card
User.findByIDCard = async function (idCard) {
    return this.findOne({ where: { idCard } });
};

// Synchronize the model with the database (if not using migrations)
User.sync();

module.exports = User;
