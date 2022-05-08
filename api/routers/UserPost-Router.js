// import express
const express = require("express")

// import userPost controller
const userPostController = require("../controllers/UserPost-Controller")

// create express router
const router = express.Router()

// endpoint for adding a new post to the database
router.post("/add", userPostController.addUserPost);

// endpoint for the action of getting user's posts
router.get("/getPosts", userPostController.getPosts);

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

// export router
module.exports = router
