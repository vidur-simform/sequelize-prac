const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

const randomDateGenerator = () => {
    const deliveryDate = new Date();
    randomDays = Math.floor(Math.random() * 7) + 1; // add 5 days
    deliveryDate.setDate(deliveryDate.getDate() + randomDays); // adds the new random number of days to the delivery date
    return deliveryDate;
};

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
        
            attributes: ["id", "status", "expected_date",'user.name'],
            include: [
                { attributes: ["user.name"] }
                
            ]
        });
        orders
        res.status(200).json({
            message: "Fetched orders successfully.",
            orders: orders,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};
exports.getOrder = async (req, res, next) => {
    try {
        const orders = await Order.findAll({ include: User });
        res.status(200).json({
            message: "Fetched orders successfully.",
            orders: orders,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};
exports.createOrder = async (req, res, next) => {
    const { userId, status, productId, quantity } = req.body;
    try {
        const order = await Order.create({
            status: status,
            userId: userId,
            expected_date: randomDateGenerator(),
        });
        const prod = await Product.findByPk(productId);
        await order.addProduct(prod, { through: { quantity: quantity } });
        res.status(200).json({
            message: "Order created successfully.",
            order: order,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};
