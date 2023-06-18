const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// Import Routes
const usersRoute = require('./routes/users')
const produtoRoute = require('./routes/produtos')

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
})

// Middlewares
app.use(cors())
app.use(express.json())

// App Routes
app.use('/users', usersRoute)
app.use('/produtos', produtoRoute)

app.listen(3001, () => {
  console.log('Backend started at http://localhost:3001')
})
