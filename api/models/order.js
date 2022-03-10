const mongoose = require('mongoose');

const productschema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product:{ types: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
    quantity: {type: Number, default: 1}
});

module.export = mongoose.model('order', orderschema);