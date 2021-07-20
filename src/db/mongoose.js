require('dotenv').config()
const mongoose = require('mongoose')

//Connecting with database
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log("Connected to MongoDB.")
})


