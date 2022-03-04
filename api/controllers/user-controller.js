// Import json with list of users
const users = require('./../data/users.json');

const DBConn = require("./../Database")

// Create controller for GET request to '/users/all'
exports.getUserData = async (req, res) => {
  //res.json(users)
  const query = "SELECT * FROM User"
  DBConn.query(query, (err, result) => {
    if (err != null){
      console.log(err)
    }
    else {
      res.send(result)
    }
})
}