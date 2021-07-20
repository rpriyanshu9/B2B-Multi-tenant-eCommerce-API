const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Order schema

const orderSchema = new Schema({

    //Storing customer reference id

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },

    //Products info

    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: { type: Number, required: true },
        subTotal: { type: Number, required: true }
    }],

    //Total value of order

    total: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Order', orderSchema)