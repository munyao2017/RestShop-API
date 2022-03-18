const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {types: mongoose.Schema.Types.ObjectId, ref: 'productsSchema', required: [true,"products"]},
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('orders', ordersSchema);