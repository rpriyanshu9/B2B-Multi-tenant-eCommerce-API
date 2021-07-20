require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

//Owner schema

const ownerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//Virtual added to link products created by certain admin/owner

ownerSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'createdBy'
})

//Generation auth token for jwt based authentication

ownerSchema.methods.generateAuthToken = async function () {
    const owner = this
    const token = await jwt.sign({ _id: owner._id.toString() }, process.env.OWNER_SECRET_KEY)
    owner.tokens = owner.tokens.concat({ token })
    await owner.save()
    return token
}

//Pre hook for save used for hashing password

ownerSchema.pre('save', async function (next) {
    const owner = this

    if (owner.isModified('password')) {
        owner.password = await bcrypt.hash(owner.password, 10)
    }

    next()
})

const Owner = mongoose.model('Owner', ownerSchema)

module.exports = Owner