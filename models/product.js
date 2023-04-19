const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbSequelize");

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
});

module.exports = Product;
