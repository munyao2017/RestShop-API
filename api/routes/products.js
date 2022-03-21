const express = require('express'); 
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
       cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Dates().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file,cb) => {
   // reject a file
    if(file.mimetype === 'image/jpeg' || mimetype === 'image/png'){
        cb(null, true);
    }else{
        cd(null, false);
    }
};

const upload = multer({
   storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
const { request } = require('../../app');


//router.get('/', productsController.products-get-all);

router.post('/', checkAuth, productsController.products_create_product);

router.get('/:productId', productsController.products_get_product);

router.patch('/:productId', productsController.products_update_product);

router.delete('/:productId', productsController.products_delete_product);


module.exports = router;