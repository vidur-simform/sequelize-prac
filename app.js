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

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const summaryRoutes = require('./routes/summary');

app.use(express.urlencoded());
app.use(cors());
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/summary', summaryRoutes);

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
