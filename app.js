const express = require("express");
const app = express();
const sequelize = require("./utils/dbSequelize");
const cors = require("cors");
const port = 3000;

const Product = require('./models/product');
const Order = require('./models/order');
const User = require('./models/user');
const OrderDetail = require('./models/order-detail');

User.hasMany(Order,{constraints:true, onDelete:'CASCADE'});
Order.belongsTo(User);

Product.belongsToMany(Order,{ through: OrderDetail });
Order.belongsToMany(Product,{ through: OrderDetail });

Product.hasMany(OrderDetail);
OrderDetail.belongsTo(Product);
Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

app.use(express.urlencoded());
app.use(cors());
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server started on port ${port}...`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
