// Import express
const express = require('express')

// Import users controller
const usersController = require('./../controllers/user-controller')

// Create express router
const router = express.Router()

// Create route between usersController and '/all' endpoint
// Note:
// Main route (in server.js) for users
// is set to '/users'
// This means that all users routes
// will be prefixed with /users'
// i.e.: '/all' will become '/users/all'
router.get('/all', usersController.getUserData)

// Export router
module.exports = router