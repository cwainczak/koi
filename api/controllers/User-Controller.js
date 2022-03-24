
//import { hashString, compareStringToHash } from "../Util";
const Util = require("../Util")
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

// Controller function for PUT request to '/users/add'
exports.addUserData = async (req, res) => {
  let hashedPassword = await Util.hashString(req.body.entPass)
  console.log("Hashed password: " + hashedPassword)
  const query = "INSERT INTO User (Email, Username, Password, FriendIDs) " +
      "VALUES (\"" + req.body.entEmail + "\", \"" + req.body.entUser + "\", \"" + hashedPassword + "\", \" \");"
  console.log(query)
  DBConn.query(query, (err) => {
    if (err != null) {
      console.log(err)
      res.status(500).send("Unsuccessful account creation!")
    } else {
      res.status(201).send("Successfully added account!")
    }
  })

}

//  Controller function for PUT request to '/users/regcheck'
exports.checkRegUserData = async (req, res) => {
  let fullResult = {emailTaken: false, usernameTaken: false}
  let email = req.body.entEmail
  let username = req.body.entUser
  // check email
  const emailQuery = "SELECT Email " +
      "FROM User " +
      "WHERE Email = '" + email + "';"
  console.log(emailQuery)
  DBConn.query(emailQuery, (err, emailQueryRes) => {
    if (err != null){
      console.log(err)
      res.status(500).send("Unsuccessful registration check!")
    }
    else {
      if (emailQueryRes.length >= 1){
        fullResult.emailTaken = true
      }
    }
  })
  // check username
  const usernameQuery = "SELECT Username " +
      "FROM User " +
      "WHERE Username = '" + username + "';"
  console.log(usernameQuery)
  DBConn.query(usernameQuery, (err2, usernameQueryRes) => {
    if (err2 != null){
      console.log(err2)
      res.status(500).send("Unsuccessful registration check!")
    }
    else {
      if (usernameQueryRes.length >= 1){
        fullResult.usernameTaken = true
      }
      res.status(201).json(fullResult)
    }

  })

}



// Controller function for PUT request to '/users/verify'
exports.verifyUserData = async (req, res) => {
  let username = req.body.entUser
  // doesn't work. creates different hash
  let hashedPassword = await Util.hashString(req.body.entPass)
  const query = "SELECT UserID " +
                "FROM User " +
                "WHERE Username = '" + username + "' AND Password = '" + hashedPassword + "';"
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

