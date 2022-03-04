// Import express
const express = require('express')

// Import home controller
const homeControllers = require('./../controllers/home-controller')

// Create express router
const router = express.Router()

// Create route between homeControllers and '/' endpoint
router.get('/', homeControllers.homeGet)

// Export router
module.exports = router