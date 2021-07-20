const { body, check } = require("express-validator");

exports.register = [
    body('email', 'Email field should not be empty').not().isEmpty(),
    body('password', 'Password field should not be empty').not().isEmpty(),
    body('email', 'Email should be of correct format').isEmail()
]

exports.login = [
    body('email', 'Email field should not be empty').not().isEmpty(),
    body('password', 'Password field should not be empty').not().isEmpty(),
    body('email', 'Email should be of correct format').isEmail()
]

exports.order = [
    body('products', 'Products array should not be empty').not().isEmpty(),
    body('products').isArray(),
    body('total').isNumeric()
]
