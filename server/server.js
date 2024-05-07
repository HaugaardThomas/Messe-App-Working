require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const messerRouter = require('./routes/messer.js')
const userRouter = require('./routes/users.js')

// express app
const app = express()

// Enable CORS for all routes or specify specific origins
app.use(cors())

app.use('/uploads', express.static('uploads'));

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

// Routes
app.use('/messer', messerRouter);
app.use('/users', userRouter);


// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 