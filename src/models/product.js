const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Product schema

const productSchema = new Schema({
    //Storing admin/owner who added this product
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

//Hiding irrelevant info while sending to front-end

productSchema.methods.toJSON = function () {
    const product = this
    const productObject = product.toObject()

    delete productObject.createdBy

    return productObject
}

module.exports = mongoose.model('Product', productSchema)