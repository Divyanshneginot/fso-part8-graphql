require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const startServer = require('./server')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const PORT = process.env.PORT || 4000
startServer(PORT)