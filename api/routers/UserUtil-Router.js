// Import express
const express = require('express')

// Import users controller
const userUtilController = require('../controllers/UserUtil-Controller')

// Create express router
const router = express.Router()

router.get("/getUser", userUtilController.getUserObj)

// Export router
module.exports = router