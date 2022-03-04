
const DBConn = require("./../Database")

// Controller function for GET request to '/users/all'
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

// Controller function for GET request to '/users/add'
exports.addUserData = async (req, res) => {
  /*const query = "INSERT INTO User (Email, Username, Password, FriendIDs)" +
                "VALUES ()"*/
  console.log("The body: " + req.body)
}

