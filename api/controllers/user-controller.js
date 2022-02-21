// Import json with list of users
const users = require('./../data/users.json');

// Create controller for GET request to '/users/all'
exports.usersGetAll = async (req, res) => {
  res.json(users)
}