const {DataTypes} = require('sequelize');
const sequelize = require('../utils/dbSequelize');

//this model is for establishing super many-to-many relationship between product and order
const OrderDetail = sequelize.define('orderdetail',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity:{
        type: DataTypes.INTEGER,
        validate:{min:1}
    }
});

module.exports = OrderDetail;