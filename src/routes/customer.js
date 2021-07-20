const express = require('express')
const router = express.Router()
const { customerAuth } = require('../middlewares/auth')
const customerController = require('../controllers/customer_controller')
const customerValidators = require('../validators/customerValidators')

//Add account
router.post('/register', customerValidators.register, customerController.register)

//Login
router.post('/login', customerValidators.login, customerController.login)

//Browse Products
router.get('/products', customerController.browseProducts)

//Order products
router.post('/orderNew', customerAuth, customerValidators.order, customerController.orderProducts)

//View Orders
router.get('/orders', customerAuth, customerController.viewOrders)

module.exports = router