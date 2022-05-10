// Import express
const express = require('express')

// Import userFriend controller
const userFriendController = require('../controllers/UserFriend-Controller')

// Create express router
const router = express.Router()

router.get("/search", userFriendController.searchUserData)

// Endpoint for getting a user's current friends
router.get("/getUserFrds", userFriendController.getAllFriendsOfUser)

router.patch("/sendFrdReq", userFriendController.sendFriendReq)

router.get("/getUserFrdReqs", userFriendController.getFriendReqOfUser)

router.patch("/acceptFrdReq", userFriendController.acceptFriendReq)

router.patch("/denyFrdReq", userFriendController.denyFriendReq)

router.patch("/removeFriend", userFriendController.removeFriend)

// Export router
module.exports = router