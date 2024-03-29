const mongoose = require('mongoose');
const Orders = require('../models/orders');
const products = require('../models/products');

exports.orders_get_all = (req,res,next) => {
  Orders.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
     res.status(200).json({
         count: docs.length,
         orders: docs.map(doc => {
             return{
                 _id: doc._id,
                 product: doc.product, 
                 quantity: doc.quantity,
                 request:{
                     type: 'GET',
                     url: 'http://localhost:4006/orders' +doc._id
                 }
             };
         })
     });
    })
    .catch(err => {
     res.status(500).json({
         error: err
    });
     });
 }

 exports.orders_create_order = (req,res,next) => {
    product.findById(req.body.productId)
        .then(product => {
            if(pruduct) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            } 
            const orders = new Order({
                _id: mongoose.Types.objectId(),
                quantity: req.body.quantity,
                product: req.body.productId
              }); 
             return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4006/orders' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
}

exports.orders_get_order = (req,res,next) => {
    Order.findById(req.params.orderId)
    .populate('product', 'name')
    .exec()
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:4006/orders'
            }
        });
    })
    .catch(err => {
     res.status(500).json({
         error: err
     });
 });
 }

 exports.orders_delete_order = (req,res,next) => {
    Order.remove({ _id: req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'order deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:4006/orders',
                body: { productId: 'ID', quantity: 'Number'}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
});
}