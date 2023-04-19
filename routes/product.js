const express = require('express');

const router = express.Router();
const productController = require('../controllers/product');

router.post('/createProduct',productController.createProduct);

module.exports = router;
