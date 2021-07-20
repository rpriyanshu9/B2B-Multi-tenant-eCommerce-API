require('dotenv').config()
require('./db/mongoose')
const express = require('express')
const app = express()
const ownerRoutes = require('./routes/owner')
const customerRoutes = require('./routes/customer')
const port = process.env.PORT || 3000

app.use(express.json())

//Owner oriented routes
app.use('/owner', ownerRoutes)

//End-customer oriented routes
app.use('/customer', customerRoutes)

app.listen(port, () => {
    console.log(`Server up on port ${port}.`)
})