
const DBConn = require("../Database")

// Controller function for GET request to '/userFriend/search'
exports.searchUserData = async (req, res) => {
    let email = req.body.entEmail
    let username = req.body.entUser
    let hashedPassword = await Util.hashString(req.body.entPass)
    console.log("Hashed password: " + hashedPassword)
    const query = "INSERT INTO User (Email, Username, Password, FriendIDs) " +
        "VALUES (\"" + email + "\", \"" + username + "\", \"" + hashedPassword + "\", \" \");"
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

