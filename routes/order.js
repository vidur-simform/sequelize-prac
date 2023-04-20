const express = require('express');

const router = express.Router();
const orderController = require('../controllers/order');

router.get('/orders',orderController.getOrders);
router.get('/mostRecentOrders/:n',orderController.getMostrecentOrders);
router.get('/undeliveredOrders',orderController.getUndeliveredOrders);
router.post('/createOrder',orderController.createOrder);
router.get('/mostExpensiveOrder',orderController.getMostExpensiveOrder);
router.get('/cheapestOrder',orderController.getCheapestOrder);

module.exports = router;
