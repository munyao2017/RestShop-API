const express = require('express');
//const { default: mongoose } = require('mongoose');
//const { default: mongoose } = require('mongoose');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Dates().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file,cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || mimetype === 'image/png'){
        cb(null, true);
    }else{
        cd(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});
const { request } = require('../../app');

const product = require('../models/products');

router.get('/',(req,res, next) => {
   product.find()
   .select('name price _id productImage')
   .exec()
   .then(docs => {
       const response ={
           count: docs.length,
           Products: docs.map(doc => {
               return {
                   name: doc.name,
                   price: doc.price,
                   productImage: doc.productImage,
                   _id: doc._id,
                   request: {
                       type: 'GET',
                       url: 'http://localhost:3005/products/' +doc._id
                   }
               }
           })
       };
       //console.log(docs);
       //res.status(200).json(docs);
   })
   .catch(err => {
    const user = new User ({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
   })
    });
});

router.post('/', checkAuth, upload.single('product image'),(req,res, next) => {
   console.log(req.file);
    const product = new product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result =>{  
        console.log(result);
      })
      .catch(err => 
        console.log(err));
    res.status(201).json({
        message: 'Created product successfully',
        createdproduct: {
            name: result.name,
            proce: result.price,
            _id: result._id,
            request: {
                type: 'GET',
                url: 'http://localhost:3005/products/'+ result._id

            }
        }
    });
});

router.get('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
        console.log("From database", docs);
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3005/products/'
    
                }

            });
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
        res.status(200).json({
            message: 'product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3005/products/'+ _id

            }
        });
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
    const id = req.params.productId;
    Product.remove({ _id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message:'Product deleted',
             request: {
                type: 'POST',
                url: 'http://localhost:3005/products/',
                body: {name: 'String', price: 'Number' }
            }
         }); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
});
});

module.exports = router;