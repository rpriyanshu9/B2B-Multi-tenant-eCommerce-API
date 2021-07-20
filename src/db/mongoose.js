const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/infoware', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log("Connected to MongoDB.")
})


