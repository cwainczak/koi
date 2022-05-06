
const DBConn = require("../Database")
const {doesContain} = require("../Util");

// Controller function for GET request to '/userFriend/search'
exports.searchUserData = async (req, res) => {
    const searchInput = req.query.searchInput
    // JSON.parse will parse a JSON String to a data type based on the value fed in
    // "true" (JSON String) -> true (boolean)
    // "hello" (JSON String) -> "hello" (String; symbolized by the beginning and ending quotation marks)
    const isNewFriend = JSON.parse(req.query.isNewFriend)
    // curUser holds a User object with properties pertaining to the user who is currently signed in
    // use this for the queries below
    const currentUser = JSON.parse(req.query.curUser)
    console.log("currentUser UserID: " + currentUser.UserID)
    const query = "SELECT * FROM User WHERE UserID != " + currentUser.UserID + " AND " +
            "Username LIKE '%" + searchInput + "%';"
    console.log(query)
    DBConn.query(query, (err, searchQueryRes) => {
        if (err != null) {
            console.log(err)
            res.status(500).send("Unsuccessful friend search!")
        } else {
            let searchRes = []
            let currentUserFriends = []
            if (currentUser.FriendIDs !== "")
                currentUserFriends = currentUser.FriendIDs.split(",")
            for (let i = 0; i < currentUserFriends.length; i++){
                console.log(currentUserFriends[i])
            }
            if (isNewFriend === true){
                // filter through query results and only send array with friends who ARE NOT currently added
                for (let i = 0; i < searchQueryRes.length; i++){
                    let curRes = searchQueryRes[i]
                    let isCurFriend = doesContain(currentUserFriends, curRes.UserID)
                    let isRequested = doesContain(curRes.FriendReqIDs.split(','), currentUser.UserID)
                    console.log("isRequested: " + isRequested)
                    if (!isCurFriend) {
                        // if user isRequested by current user, disable add button
                        curRes.disabled = isRequested
                        searchRes.push(curRes)
                    }
                }
            }
            else {
                console.log("got in here")
                // filter through query results and only send json with friends who ARE currently added
                for (let i = 0; i < searchQueryRes.length; i++){
                    let curRes = searchQueryRes[i]
                    let isCurFriend = doesContain(currentUserFriends, curRes.UserID)
                    if (isCurFriend) searchRes.push(curRes)
                }
            }
            res.status(201).send(searchRes)
        }
    })

}

// Controller function for GET request to '/userFriend/getUserFriends'
exports.getAllFriendsOfUser = async (req, res) => {
    const currentUser = JSON.parse(req.query.curUser)
    console.log("currentUser UserID: " + currentUser.UserID)
    const query = "SELECT * " +
                  "FROM User " +
                  "WHERE UserID IN (" + currentUser.FriendIDs + ");"
    console.log(query)
    DBConn.query(query, (err, queryRes) => {
        if (err != null) {
            console.log(err)
            res.status(500).send("Unsuccessful retrieval of user's friends!")
        } else {
            res.status(201).send(queryRes)
        }
    })
}

// Controller function for PATCH request to '/userFriend/sentFrdReq'
exports.sendFriendReq = async (req, res) => {
    const curUserID = req.body.curUserID
    const newFriendUsername = req.body.newFriendUsername
    const query = `UPDATE User SET FriendReqIDs = CONCAT(CONCAT(FriendReqIDs, \",\"), ${curUserID}) WHERE Username = \"${newFriendUsername}\";`
    console.log(query)
    DBConn.query(query, (err) => {
        if (err != null) {
            console.log(err)
            res.status(500).send("Unsuccessful friend request!")
        } else {
            res.status(201).send()
        }
    })
}

