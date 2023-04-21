const User = require("../models/user");
const Order = require("../models/order");
const { literal, fn, col, Op } = require("sequelize");
exports.createUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const user = await User.create({
            name,
            email
        });
        res.status(200).json({
            message: 'User created successfully.',
            user: user
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};
exports.getActiveUsers = async (req, res, next) => {
    const n = parseInt(req.params.n);
    try {
        const users = await Order.findAll({
            attributes: [[literal("user.name"), "user_name"], [fn("COUNT", col("userId")), "total_orders"]],
            include: [
                { model: User, attributes: [] },
            ],
            group: ["userId"],
            order: [["total_orders", "DESC"]],
            limit: n
        });
        res.status(200).json({
            message: `Fetched most ${n} active users successfully.`,
            users: users,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};
exports.getInActiveUsers = async (req, res, next) => {
    try {
        let activeUsers = await Order.findAll({
            attributes: ["userId"],
            group: ["userId"],
        });
        activeUsersIds = activeUsers.map(o=>o.userId)
        const users = await User.findAll({
            where: {
                id:{
                    [Op.notIn]: activeUsersIds
                }
            }
        });
        res.status(200).json({
            message: "Fetched inactive users successfully.",
            users: users,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};
