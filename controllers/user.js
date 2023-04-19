const User = require("../models/user");

exports.createUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        // const user = await User.create({
        //     name,
        //     email
        // });
        // res.status(200).json({
        //     message: 'User created successfully.',
        //     user: user
        // });
        const users = await User.bulkCreate([
            {
                name:"Vidur",
                email:"vidur@abc.com"
            },
            {
                name:"Harsh",
                email:"harsh@abc.com"
            },
            {
                name:"Raj",
                email:"raj@abc.com"
            },
            {
                name:"Utsav",
                email:"utsav@abc.com"
            }
        ]);
        res.status(200).json({
            message: 'Temp Users created successfully.',
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