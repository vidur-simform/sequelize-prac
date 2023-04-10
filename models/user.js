const Sequelize = require('sequelize');
const sequelize = require('../utils/dbSequelize');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});
console.log(sequelize.models);
module.exports = User;
