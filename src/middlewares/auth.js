require('dotenv').config()
const jwt = require('jsonwebtoken')
const { ObjectID } = require('mongodb')
const Customer = require('../models/customer')
const Owner = require('../models/owner')

//Auth for end-customer

const customerAuth = async (req, res, next) => {
    try {
        //Getting token from headers and manipulating it
        const token = req.headers.authorization.replace('Bearer ', '')
        //Decoding it using secret key
        const verified = await jwt.verify(token, process.env.CUSTOMER_SECRET_KEY)
        const { _id } = verified
        //Checking if valid
        const customer = await Customer.findOne({ _id: new ObjectID(_id), 'tokens.token': token })
        if (!customer) {
            throw new Error()
        }
        req.token = token
        req.customer = customer
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

//Auth for owner/admin

const ownerAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const verified = await jwt.verify(token, process.env.OWNER_SECRET_KEY)
        const { _id } = verified
        const owner = await Owner.findOne({ _id: new ObjectID(_id), 'tokens.token': token })
        if (!owner) {
            throw new Error()
        }
        req.token = token
        req.owner = owner
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = {
    customerAuth,
    ownerAuth
}