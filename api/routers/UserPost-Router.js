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

// export router
module.exports = router
