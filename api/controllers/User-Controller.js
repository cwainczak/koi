
const Util = require("../Util")
const DBConn = require("../Database")

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

//  Controller function for GET request to '/users/regcheck'
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
  let password = req.body.entPass
  const query = "SELECT * FROM User;"
  console.log(query)
  DBConn.query(query, async (err, allUsers) => {
    if (err != null) {
      console.log(err)
      res.status(500).send("Unsuccessful account verification!")
    } else {
      let result = []
      for (let i = 0; i < allUsers.length; i++) {
        let curUser = allUsers[i]
        let checkHash = await Util.compareStringToHash(password, curUser.Password)
        console.log("checkHash = " + checkHash)
        if (curUser.Username === username && checkHash) {
          result.push(curUser)
          console.log(result)
        }
      }
      res.status(201).json(result)
    }
  })
}

exports.sendPasswordCode = async (req, res) => {
  let email = req.query.entEmail
  // first, make sure email is linked to an account
  let fullResult = {validEmail: false, emailJSData: {}}
  const emailQuery = "SELECT Email, Username " +
                     "FROM User " +
                     "WHERE Email = '" + email + "';"
  DBConn.query(emailQuery, async (err, emailQueryRes) => {
    console.log(emailQueryRes)
    if (err != null){
      console.log(err)
      res.status(500).send("Unsuccessful registration check!")
    }
    else {
      if (emailQueryRes.length >= 1){
        fullResult.validEmail = true
      }
      // if email is valid
      if (fullResult.validEmail){
        // generate and set passcode
        const passcode = await Util.genPassCode()
        // set emailjs data so it can be sent to frontend
        fullResult.emailJSData = {
          serviceID: "service_na87syf",
          templateID: "template_zokb0jg",
          templateParams: {
            to_email: email,
            to_name: emailQueryRes[0].Username,
            passcode: passcode
          },
          userID: "7MsNA5X-6xHY1DK_m"
        }
      }
      console.log("in user-controller")
      console.log(fullResult)
      res.status(201).json(fullResult)
    }
  })
}

