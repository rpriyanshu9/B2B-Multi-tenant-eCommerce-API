const { body } = require("express-validator");

//Validations for request body of owner/admin related endpoints

exports.register = [
    body('email', 'Email field should not be empty').not().isEmpty(),
    body('password', 'Password field should not be empty').not().isEmpty(),
    body('email', 'Email should be of correct format').isEmail(),
    body('password', 'Password\'s length should be atlest 6').isLength({ min: 6 })
]

exports.addNewProduct = [
    body('name', 'Name field should not be empty').not().isEmpty(),
    body('description', 'Description field should not be empty').not().isEmpty(),
    body('price', 'Price field should not be empty').not().isEmpty(),
    body('price', 'Price field should be a numeric value').isNumeric()
]