const express = require('express');
//const { default: mongoose } = require('mongoose');
//const { default: mongoose } = require('mongoose');
const router = express.Router();
const mongoose = require('mongoose');
const { request } = require('../../app');

const product = require('../models/products');

router.get('/',(req,res, next) => {
   product.find()
   .exec()
   .then(docs => {
       console.log(docs);
       res.status(200).json(docs);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
   })
    });
});

router.post('/',(req,res, next) => {
   // const product = {
     //   name: req.body.name,
     //   price: req.body.price
   // };
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
    product.findById(id)
    .exec()
    .then(docs => {
        console.log("From database", docs);
        if (doc) {
            res.status(200).json(docs);
        }else {
            res.status(404).json({message: "No valid entry found for provided ID"});
        }

    })
    .catch(err => {
        console.log(err);
    res.status(500).json({
        error: err
    });
    
});

router.patch('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    product.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        console.log(res);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    });
});

router.delete('/:productId',(req,res,next) =>{
    res.status(200).json({
        message:'deleted product!'
    });
});

module.exports = router;