const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())

const server = app.listen(process.env.PORT, () => {
    console.log(`SErver Started on port ${process.env.PORT}`)
})