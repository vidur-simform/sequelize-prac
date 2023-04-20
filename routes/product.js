const express = require('express');

const router = express.Router();
const productController = require('../controllers/product');

router.post('/createProduct',productController.createProduct);
router.get('/mostPurchasedProducts/:n',productController.getMostPurchasedProducts);

module.exports = router;
