const express = require('express');

const router = express.Router();
const orderController = require('../controllers/order');

router.get('/orders',orderController.getOrders);
router.get('/orders/:userId',orderController.getOrder);
router.post('/createOrder',orderController.createOrder);

module.exports = router;
