const Product = require("../models/product");

exports.createProduct = async (req, res, next) => {
    const { title, price } = req.body;
    try {
        // const product = await Product.create({
        //     title,
        //     price
        // });
        // res.status(200).json({
        //     message: 'Product created successfully.',
        //     product: product
        // });
        const products = await Product.bulkCreate([
            {
                title:'keyboard1',
                price:1000
            },
            {
                title:'mouse logitech',
                price:700
            },
            {
                title:'laptop',
                price:50000
            },
            {
                title:'monitor',
                price:20000
            },
            {
                title:'camera',
                price:10000
            },
            {
                title:'headphones',
                price:3000
            }
        ]);
        res.status(200).json({
            message: 'Temp Prods created successfully.',
            // user: user
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};