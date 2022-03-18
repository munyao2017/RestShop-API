const product = require('../models/products');

exports.products_get_all = (req,res, next) => {
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
                        url: 'http://localhost:4006/products/' +doc._id
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
 }

 exports.products_create_product = upload.single('product image'),(req,res, next) => {
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
                 url: 'http://localhost:4006/products/'+ result._id
 
             }
         }
     });
 }

 exports.products_get_product = (req,res,next) =>{
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
                    url: 'http://localhost:4006/products/'
    
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
    })
}
    exports.products_patch_product = (req,res,next) =>{
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
                    url: 'http://localhost:4006/products/'+ _id
    
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

exports.products_delete_product = (req,res,next) =>{
    const id = req.params.productId;
    Product.remove({ _id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message:'Product deleted',
             request: {
                type: 'POST',
                url: 'http://localhost:4006/products/',
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
}