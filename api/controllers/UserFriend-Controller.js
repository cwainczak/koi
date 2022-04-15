
const DBConn = require("../Database")
const {doesContain} = require("../Util");

// Controller function for GET request to '/userFriend/search'
exports.searchUserData = async (req, res) => {
    const searchInput = req.query.searchInput
    const isNewFriend = req.query.isNewFriend
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
            if (isNewFriend){
                // filter through query results and only send array with friends who ARE NOT currently added
                for (let i = 0; i < searchQueryRes.length; i++){
                    let curRes = searchQueryRes[i]
                    // console.log(curRes)
                    //console.log("currentUserFriends: " + currentUserFriends)
                    //console.log("curRes.UserID: " + curRes.UserID)
                    //console.log("Result of includes: " + doesContain(currentUserFriends, curRes.UserID))
                    //if (!currentUserFriends.includes(curRes.UserID)){
                    if (!doesContain(currentUserFriends, curRes.UserID)){
                        searchRes.push(curRes)
                    }
                }
            }
            else {
                // filter through query results and only send json with friends who ARE NOT currently added
                for (let i = 0; i < searchQueryRes.length; i++){
                    let curRes = searchQueryRes[i]
                    //if (currentUserFriends.includes(curRes.UserID)){
                    if (doesContain(currentUserFriends, curRes.UserID)){
                        searchRes.push(curRes)
                    }
                }
            }
            //console.log("finished")
            res.status(201).send(searchRes)
        }
    })

}

