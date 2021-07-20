const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
})

productSchema.methods.toJSON = function () {
    const product = this
    const productObject = product.toObject()

    delete productObject.createdBy

    return productObject
}

module.exports = mongoose.model('Product', productSchema)