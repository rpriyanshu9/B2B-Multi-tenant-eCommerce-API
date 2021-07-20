require('./db/mongoose')
const express = require('express')
const app = express()
const ownerRoutes = require('./routes/owner')
const customerRoutes = require('./routes/customer')

app.use(express.json())

app.use('/owner', ownerRoutes)
app.use('/customer', customerRoutes)

app.listen(3000, () => {
    console.log("Server up on port 3000.")
})