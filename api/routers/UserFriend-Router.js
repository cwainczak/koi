// Import express
const express = require('express')

// Import userFriend controller
const userFriendController = require('../controllers/UserFriend-Controller')

// Create express router
const router = express.Router()

// Endpoint for checking user credentials
router.get("/search", userFriendController.searchUserData)

// Endpoint for getting a user's current friends
router.get("/getUserFriends", userFriendController.getAllFriendsOfUser)

router.patch("/sentFrdReq", userFriendController.sendFriendReq)

router.get("/getUserFriendReqs", userFriendController.getFriendReqOfUser)

router.patch("/acceptFrdReq", userFriendController.acceptFriendReq)

router.patch("/denyFrdReq", userFriendController.denyFriendReq)

// Export router
module.exports = router