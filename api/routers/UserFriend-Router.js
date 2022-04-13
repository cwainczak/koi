// Import express
const express = require('express')

// Import userFriend controller
const userFriendController = require('../controllers/UserFriend-Controller')

// Create express router
const router = express.Router()

// Endpoint for checking user credentials
router.get("/search", userFriendController.searchUserData)

// Export router
module.exports = router