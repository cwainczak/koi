// Import express framework
const express = require('express')

// Import middleware
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

// Import routers
const userLoginRouter = require('./routers/UserLogin-Router')
const userFriendRouter = require("./routers/UserFriend-Router")
const userUtilRouter = require("./routers/UserUtil-Router")

// Setup default port
const PORT = process.env.PORT || 4000

// Create express app
const app = express()

// Implement middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.get('*', (req, res) => {
      res.sendFile('build/index.html', { root: __dirname })
  })
}

// Implement route for '/users' endpoint
// ! Note:
// '/users' will prefix all post routes
// with '/users' => '/all' will become '/users/all'
app.use('/userLogin', userLoginRouter)
app.use("/userFriend", userFriendRouter)
app.use("/user", userUtilRouter)

// Implement route for errors
app.use((err, req, res, next) => {
   console.error(err.stack)

   res.status(500).send('Something broke!')
})

// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})
