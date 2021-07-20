const Owner = require('../models/owner')
const Product = require('../models/product')
const Order = require('../models/order')
const { validationResult } = require('express-validator')

//Registering new owner

const register = async (req, res) => {
    try {

        //Validating req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0]
            });
        }

        const { email, password } = req.body

        const owner = await Owner.findOne({ email })
        if (owner) {
            return res.status(500).json({
                error: "Owner already exists with the given email address."
            })
        }

        const newOwner = new Owner(req.body)
        const createdOwner = await newOwner.save()
        if (!createdOwner) {
            return res.status(500).json({
                error: "Could not create owner with the given credentials."
            })
        }

        const token = await createdOwner.generateAuthToken()

        return res.status(201).json({
            message: "Owner created Successfully.",
            token
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

//Adding new product

const addNewProduct = async (req, res) => {
    try {

        //Validating req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0]
            });
        }

        const { name, description, price } = req.body
        const newProduct = new Product({
            name, description, price,
            createdBy: req.owner._id
        })
        const result = await newProduct.save()
        if (!result) {
            return res.status(500).json({
                error: "Could not add product."
            })
        }
        res.status(201).json({
            message: "Product created successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

//Viewing orders

const viewOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({
            data: orders
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

module.exports = {
    register,
    addNewProduct,
    viewOrders
}