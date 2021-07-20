const mongoose = require('mongoose')
const Customer = require('../models/customer')
const Product = require('../models/product')
const Order = require('../models/order')
const { validationResult } = require('express-validator')

//Registering new customer

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

        const customer = await Customer.findOne({ email })
        if (customer) {
            return res.status(500).json({
                error: "Customer already exists with the given email address."
            })
        }

        const newCustomer = new Customer(req.body)
        const createdCustomer = await newCustomer.save()
        if (!createdCustomer) {
            return res.status(500).json({
                error: "Could not create customer with the given credentials."
            })
        }

        const token = await createdCustomer.generateAuthToken()

        return res.status(201).json({
            message: "Customer created Successfully.",
            token
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

//Logging in customer

const login = async (req, res) => {
    try {

        //Validating req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0]
            });
        }

        const { email, password } = req.body
        const customer = await Customer.findByCredentials(email, password)
        const token = await customer.generateAuthToken()

        res.status(200).json({
            message: "Successful Login.",
            token
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

//Browse/Show all products

const browseProducts = async (req, res) => {
    try {
        const products = await Product.find()
        if (products.length <= 0) {
            return res.status(500).json({
                error: "No products available."
            })
        }
        res.status(200).json({
            products
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

//Placing order

const orderProducts = async (req, res) => {
    try {

        //Validating req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0]
            });
        }

        //Assumming req.body.products contain the list of objectID of individual product with subTotal and qty from front-end
        const products = req.body.products.map((elem) => {
            return {
                product: mongoose.Types.ObjectId(elem.product),
                subTotal: elem.subTotal,
                quantity: elem.quantity
            }
        })

        const order = new Order({
            customer: req.customer,
            products,
            total: req.body.total
        })

        const newOrder = await order.save()
        if (!newOrder) {
            return res.status(500).json({
                error: "Could not create this order. Please try again."
            })
        }

        res.status(201).json({
            message: "Order successfully placed."
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

//Viewing orders of single/current customer

const viewOrders = async (req, res) => {
    try {

        const customerID = req.customer._id;
        const orders = await Order.find({ customer: customerID })
            .populate('customer', 'email')
            .populate('products.product', 'name price')
        if (!orders) {
            return res.status(404).json({
                error: "No orders found."
            })
        }

        res.status(200).json({
            orders
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

module.exports = {
    orderProducts,
    viewOrders,
    register,
    login,
    browseProducts
}