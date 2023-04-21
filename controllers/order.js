const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const { literal } = require("sequelize");
const OrderDetail = require("../models/order-detail");
const sequelize = require("../utils/dbSequelize");

const randomDateGenerator = () => {
    const deliveryDate = new Date();
    randomDays = Math.floor(Math.random() * 7) + 1; // add 5 days
    deliveryDate.setDate(deliveryDate.getDate() + randomDays); // adds the new random number of days to the delivery date
    return deliveryDate;
};

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({

            attributes: ["id", "status", [literal(`DATE(order.createdAt)`), "order_date"], [literal(`DATEDIFF(expected_date, NOW())`), "expected_delivery_days"], [literal(`user.name`), "username"]],
            include: [
                { model: User, attributes: [] },
                { model: Product, attributes: ["title", "price"], through: { attributes: [] } }
            ]
        });
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

exports.getUndeliveredOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            attributes: ["id", [literal(`DATE(order.createdAt)`), "order_date"], 
            [literal(`DATEDIFF(expected_date, NOW())`), "expected_delivery_days"], 
            [literal(`user.name`), "username"]],
            include: [
                { model: User, attributes: [] },
                { model: Product, attributes: ["title", "price"], through: { attributes: [] } }
            ]
            , where: {
                status: "undelivered"
            }
        });
        res.status(200).json({
            message: "Fetched undelivered orders successfully.",
            orders: orders,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};

exports.getMostrecentOrders = async (req, res, next) => {
    const n = parseInt(req.params.n);
    try {
        const orders = await Order.findAll({
            attributes: ["id", "createdAt", [literal(`DATE(order.createdAt)`), "order_date"], 
            [literal(`DATEDIFF(expected_date, NOW())`), "expected_delivery_days"], 
            [literal(`user.name`), "username"]],
            include: [
                { model: User, required: true, attributes: [] },
                { model: Product, required: true, attributes: ["title", "price"], 
                through: { attributes: [] } }
            ],
            order: literal('createdAt DESC'),
            limit: n
        });
        res.status(200).json({
            message: `Fetched most ${n} recent orders successfully.`,
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

    const { userId, status, productIds, quantities } = req.body;
    const pids = productIds.split(",");
    const qs = quantities.split(",");
    try {
        const result = await sequelize.transaction(async (t) => {
            const order = await Order.create({
                status: status,
                userId: userId,
                expected_date: randomDateGenerator(),
            }, { transaction: t });

            const oid = order.id;
            const OrderDetailsArr = pids.map((pid, i) => {
                return {
                    productId: pid,
                    orderId: oid,
                    quantity: qs[i]
                };
            });

            await OrderDetail.bulkCreate(OrderDetailsArr,{ transaction: t });
            res.status(200).json({
                message: "Order created successfully.",
                order: order
            });
            return order;
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};

exports.getMostExpensiveOrder = async (req, res, next) => {
    try {
        const orders = await OrderDetail.findAll({
            attributes: ["orderId", [literal("SUM(quantity*product.price)"), "total_cost"]],
            group: ["orderId"],
            include: [
                { model: Product, as: "product", attributes: [] }
            ],
            order: [["total_cost", "DESC"]],
            limit: 1
        });
        res.status(200).json({
            message: "Fetched most expensive order successfully.",
            order: orders[0]
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};

exports.getCheapestOrder = async (req, res, next) => {
    try {
        const orders = await OrderDetail.findAll({
            attributes: ["orderId", [literal("SUM(quantity*product.price)"), "total_cost"]],
            group: ["orderId"],
            include: [
                { model: Product, as: "product", attributes: [] }
            ],
            order: [["total_cost", "ASC"]],
            limit: 1
        });
        res.status(200).json({
            message: "Fetched cheapest order successfully.",
            order: orders[0]
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};