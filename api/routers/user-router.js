// Import express
const express = require('express')

// Import users controller
const usersController = require('./../controllers/user-controller')

// Create express router
const router = express.Router()

// Endpoint for fetching all users from database
router.get('/all', usersController.getUserData)

// Endpoint for adding user to database
router.put('/add', usersController.addUserData)

// Export router
module.exports = router