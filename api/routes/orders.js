const express = require('express');
//const res = require('express/lib/response');
const router = express.Router();
const mongoose = require('mongoose');

const Orders = require('../models/orders');
const products = require('../models/products');
const checkAuth = require('../middleware/check-auth');

const ordersController = require('../controllers/orders');
//handle incoming GET requests to /orders
router.get('/', checkAuth, ordersController.orders-get-all);

router.post('/:', checkAuth, ordersController.orders_create_order);

router.get('/:ordersId', checkAuth, ordersController.orders_get_order);

router.delete('/:ordersId', checkAuth, ordersController.orders_delete_order);

module.exports = router;