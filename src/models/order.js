const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: { type: Number, required: true },
        subTotal: { type: Number, required: true }
    }],
    total: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Order', orderSchema)