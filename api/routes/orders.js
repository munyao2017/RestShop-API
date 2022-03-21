const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ordersController = require('../controllers/order');

//handle incoming GET requests to /orders
router.get('/', checkAuth, ordersController.orders_get_all);

router.post('/:', checkAuth, ordersController.orders_create_order);

router.get('/:ordersId', checkAuth, ordersController.orders_get_order);

router.delete('/:ordersId', checkAuth, ordersController.orders_delete_order);

module.exports = router;