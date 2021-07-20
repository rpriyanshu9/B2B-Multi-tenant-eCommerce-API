require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

//Customer model schema

const customerSchema = new Schema({
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

//Generation auth token for jwt based authentication

customerSchema.methods.generateAuthToken = async function () {
    const customer = this
    const token = await jwt.sign({ _id: customer._id.toString() }, process.env.CUSTOMER_SECRET_KEY)
    //Adding token to customer document
    customer.tokens = customer.tokens.concat({ token })
    await customer.save()
    return token
}

//Helper function for logging in customer

customerSchema.statics.findByCredentials = async (email, password) => {
    const customer = await Customer.findOne({ email })
    if (!customer) {
        throw new Error('Unable to log in')
    }
    const isMatch = await bcrypt.compare(password, customer.password)
    if (!isMatch) {
        throw new Error('Unable to log in')
    }
    return customer
}

//Pre hook for save used for hashing password

customerSchema.pre('save', async function (next) {
    const customer = this

    if (customer.isModified('password')) {
        customer.password = await bcrypt.hash(customer.password, 10)
    }

    next()
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer