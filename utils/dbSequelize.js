const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('node_db', 'root', 'Simform@123', {
  dialect: 'mysql',
  host: 'localhost',
  logging: console.log,     
});

module.exports = sequelize;