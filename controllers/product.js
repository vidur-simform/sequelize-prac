const Product = require("../models/product");
const Order = require("../models/order");
const OrderDetail = require("../models/order-detail");
const { literal, fn, col } = require("sequelize");

exports.createProduct = async (req, res, next) => {
    const { title, price } = req.body;
    try {
        const product = await Product.create({
            title,
            price
        });
        res.status(200).json({
            message: 'Product created successfully.',
            product: product
        });
        // const products = await Product.bulkCreate([
        //     {
        //         title: 'keyboard1',
        //         price: 1000
        //     },
        //     {
        //         title: 'mouse logitech',
        //         price: 700
        //     },
        //     {
        //         title: 'laptop',
        //         price: 50000
        //     },
        //     {
        //         title: 'monitor',
        //         price: 20000
        //     },
        //     {
        //         title: 'camera',
        //         price: 10000
        //     },
        //     {
        //         title: 'headphones',
        //         price: 3000
        //     }
        // ]);
        // res.status(200).json({
        //     message: 'Temp Prods created successfully.',
        //     // user: user
        // });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};

exports.getMostPurchasedProducts = async (req, res, next) => {
    try {
        const n = parseInt(req.params.n);
        const products = await OrderDetail.findAll({
            attributes: [[literal(`product.title`), "product_name"],[fn("SUM", col("quantity")), "total_purchased"]],
            group: ["productId"],
            include: [
                { model: Product, attributes: [] }
            ],
            order: [["total_purchased", "DESC"]],
            limit:n
        });
        res.status(200).json({
            message: `Fetched most ${n} most purchased products successfully.`,
            products: products
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};