// Import express
const express = require('express')

// Import users controller
const usersController = require('../controllers/User-Controller')

// Create express router
const router = express.Router()

// Endpoint for checking user credentials
router.get("/verify", usersController.verifyUserData)

// Endpoint for adding user to database
router.post('/add', usersController.addUserData);

// Endpoint for checking if registration info is unique
router.get("/regcheck", usersController.checkRegUserData)

// Export router
module.exports = router