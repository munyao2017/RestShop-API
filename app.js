const express = require('express');
//const res = require('express/lib/response');
const app = express();
const morgan =require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')



const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://munyao-2022:' +
process.env.MONGO_ATLAS_PW +
'@munyao-2022.paj4h.mongodb.net/REST-SHOP?retryWrites=true&w=majority',
 {
    useMongoClient: true
}
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
});


//routes that handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;