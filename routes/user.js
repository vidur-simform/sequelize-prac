const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.post('/createUser',userController.createUser);
router.get('/activeUsers/:n',userController.getActiveUsers);
router.get('/inActiveUsers',userController.getInActiveUsers);

module.exports = router;
