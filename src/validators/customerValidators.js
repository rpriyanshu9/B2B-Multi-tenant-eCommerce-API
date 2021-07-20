const { body, check } = require("express-validator");

//Validations for request body of end customer related endpoints

exports.register = [
    body('email', 'Email field should not be empty').not().isEmpty(),
    body('password', 'Password field should not be empty').not().isEmpty(),
    body('email', 'Email should be of correct format').isEmail(),
    body('password', 'Password\'s length should be atlest 6').isLength({ min: 6 })
]

exports.login = [
    body('email', 'Email field should not be empty').not().isEmpty(),
    body('password', 'Password field should not be empty').not().isEmpty(),
    body('email', 'Email should be of correct format').isEmail(),
    body('password', 'Password\'s length should be atlest 6').isLength({ min: 6 })
]

exports.order = [
    body('products', 'Products array should not be empty').not().isEmpty(),
    body('products').isArray(),
    body('total').isNumeric()
]
