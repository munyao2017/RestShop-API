const express = require('express');
const { default: mongoose } = require('mongoose');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const mongoose = require(mongoose);

const product = require('../models/products');
router.get('/',(req,res, next) => {
    res.status(200).json({
        message: 'Handling request GET requests to /product'
    });
});

router.post('/',(req,res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    const product = new product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result =>{  
        console.log(result);
      })
      .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling request POST requests to /product',
        createdproduct: product
    });
});

router.get('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: 'You dicovered the special ID'
        });
    }else{
        res.status(200).json({
            message: 'you passed an ID'
        });
    }
});

router.patch('/:productId',(req,res,next) =>{
    res.status(200).json({
        message:'updated product!'
    });
});

router.delete('/:productId',(req,res,next) =>{
    res.status(200).json({
        message:'deleted product!'
    });
});

module.exports = router;