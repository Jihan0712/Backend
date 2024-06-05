require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') // Import cors package
const smokeRoutes = require('./routes/smoke')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(cors({
  origin: 'https://emtst.netlify.app', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}))
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/smokes', smokeRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
