const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require('./routes/userRoutes')

const app = express()
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB Connection is successful")
})
.catch((err) => {
    console.log(err.message)
})

app.use(cors())
app.use(express.json())
app.use('/api/auth', userRoutes)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`)
})