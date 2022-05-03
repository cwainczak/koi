// Import express
const express = require('express')

// Import users controller
const usersController = require('../controllers/UserAccount-Controller')

// Create express router
const router = express.Router()

// Endpoint for checking user credentials
router.get("/verify", usersController.verifyUserData)

// Endpoint for adding user to database
router.post('/add', usersController.addUserData);

// Endpoint for checking if registration info is unique
router.get("/regcheck", usersController.checkRegUserData)

// Endpoint for sending passcode to reset password (gets the passcode)
router.get("/verCode", usersController.getVerificationCodeData)

// Endpoint for the action of resetting the password
router.patch("/resetPass", usersController.resetPassword)

// Endpoint for the action of deleting the user
router.delete("/delete", usersController.deleteUser);

// Export router
module.exports = router
