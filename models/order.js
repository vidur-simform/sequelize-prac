const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbSequelize");

const Order = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    //for order status true for delivered and false for undelivered orders
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expected_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Order;
