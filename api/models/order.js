const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product:{ types: mongoose.Schema.Types.ObjectId, ref: 'productSchema', required: true,},
    quantity: {type: Number, default: 1}
});

module.export = mongoose.model('order', orderschema);