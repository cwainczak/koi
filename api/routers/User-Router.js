// Import express
const express = require('express')

// Import users controller
const usersController = require('../controllers/User-Controller')

// Create express router
const router = express.Router()

// Endpoint for checking user credentials
router.put("/verify", usersController.verifyUserData)

// Endpoint for adding user to database
router.put('/add', usersController.addUserData);

// Endpoint for checking if registraiton info is unique
router.put("/regcheck", usersController.checkRegUserData)

// Endpoint for sending passcode to reset password (gets the passcode)
router.get("/verCode", usersController.getVerificationCodeData)

// Endpoint for the action of resetting the password
router.patch("/resetPass", usersController.resetPassword)

// Export router
module.exports = router