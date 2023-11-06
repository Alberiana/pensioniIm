const { Sequelize } = require('sequelize'); // Use require instead of import

const sequelize = new Sequelize('pensioniIm', 'root', 'lqsym', {
    dialect: 'mysql',
    host: 'localhost', 
});

module.exports = sequelize; // Use module.exports to export the sequelize instance
