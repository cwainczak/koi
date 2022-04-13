
const DBConn = require("../Database")

// Controller function for GET request to '/userFriend/search'
exports.searchUserData = async (req, res) => {
    const searchInput = req.query.searchInput
    const isNewFriend = req.query.isNewFriend
    const curUser = req.query.curUser
    let query
    if (isNewFriend)
        // select user that matches the search input and also is not already friends with the current user
        query = "SELECT * FROM User WHERE Username LIKE '%" + searchInput + "%';"
    else
        // select user that matches the search input and is already friends with the current user
        query =


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

