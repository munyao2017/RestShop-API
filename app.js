const express = require('express');
const app = express();
const morgan =require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');




//mongoose.connect('mongodb+srv://munyao-2022:Mutanu@45@host.gcp.mongodb.net/test?retryWrites=true'

    //'mongodb+srv://munyao-2022:' +
//process.env.MONGO_ATLAS_PW +

//'@munyao-2022.paj4h.mongodb.net/REST-SHOP?retryWrites=true&w=majority',
//'mongodb+srv://myuser:Mutanu@45@host.gcp.mongodb.net/test?retryWrites=true',
//'@munyao-2022.Mutanu@45.mongodb.net/REST-SHOP?retryWrites=true&w=majority',

//{
  //  useMongoClient: true
//}
//);

mongoURI =  "mongodb+srv://Esther Munyao:mutanu2017@devconnector.jpokp.mongodb.net/dbname?retryWrites=true&w=majority" 

mongoose .connect(mongoURI, { useNewUrlParser: true }) .then(() => console.log("MongoDB connected")) .catch((err) => console.log(err));

mongoose.Promise =global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
});


//routes that handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);



app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;