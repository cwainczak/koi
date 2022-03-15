
const DBConn = require("../Database")

// Controller function for GET request to '/users/all'
// exports.getUserData = async (req, res) => {
//   //res.json(users)
//   const query = "SELECT * FROM User"
//   DBConn.query(query, (err, result) => {
//     if (err != null){
//       console.log(err)
//     }
//     else {
//       res.send(result)
//     }
// })
// }

// Controller function for GET request to '/users/add'
exports.addUserData = async (req, res) => {
  //console.log("The body: ");
  //console.log(req.body);
  console.log(req.body)
  const query = "INSERT INTO User (Email, Username, Password, FriendIDs) " +
      "VALUES (\"" + req.body.entEmail + "\", \"" + req.body.entUser + "\", \"" + req.body.entPass + "\", \" \");"
  console.log(query)
  DBConn.query(query, (err) => {
    if (err != null){
      console.log(err)
      res.status(500).send("Unsuccessful account creation!")
    }
    else {
      res.status(201).send("Successfully added account!")
    }
  })

}

// Controller function for GET request to '/users/verify'
exports.verifyUserData = async (req, res) => {
  console.log("entered function")
  let username = req.body.entUser
  let password = req.body.entPass
  const query = "SELECT UserID " +
                "FROM User " +
                "WHERE Username = '" + username + "' AND Password = '" + password + "';"
  console.log(query)
  DBConn.query(query, (err, result) => {
    if (err != null){
      console.log(err)
      res.status(500).send("Unsuccessful account verification!")
    }
    else {
      res.status(201).json(result)
    }
  })

}

