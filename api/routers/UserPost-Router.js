// import express
const express = require("express")

// import userPost controller
const userPostController = require("../controllers/UserPost-Controller")

// create express router
const router = express.Router()

// endpoint for adding a new post to the database
router.post("/add", userPostController.addUserPost);

// endpoint for the action of getting user's posts
router.get("/getUsersPosts", userPostController.getUsersPosts);

// endpoint for the action of getting a user's friend's posts (for the feed)
router.get("/getUserFrdsPosts", userPostController.getUserFriendsPosts);

// endpoint for the action of getting post's comments
router.get("/getPostComments", userPostController.getPostComments);

// endpoint for the action of deleting a post
router.delete("/delete", userPostController.deletePost);

// endpoint for the action of adding a new comment to a post
router.post("/addComment", userPostController.addUserComment);

// endpoint for the action of liking a post
router.patch("/like", userPostController.likeUserPost)

// endpoint for the action for getting number of user comments
router.get("/numComments", userPostController.getNumComments);

// endpoint for the action for getting the number of friends
router.get("/numFriends", userPostController.getNumFriends);

// export router
module.exports = router
