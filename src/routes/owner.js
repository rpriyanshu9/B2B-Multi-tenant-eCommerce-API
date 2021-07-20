const express = require('express')
const router = express.Router()
const { ownerAuth } = require('../middlewares/auth')
const ownerValidators = require('../validators/ownerValidators')
const ownerController = require('../controllers/owner_controller')

//Add account
router.post('/register', ownerValidators.register, ownerController.register)

//Add products
router.post('/addproduct', ownerAuth, ownerValidators.addNewProduct, ownerController.addNewProduct)

//View Orders
router.get('/orders', ownerAuth, ownerController.viewOrders)

module.exports = router