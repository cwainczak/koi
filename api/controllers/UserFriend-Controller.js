
const DBConn = require("../Database")
const {doesContain, removeElementByVal} = require("../Util");

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
            let currentUserFriends = friendStrToArr(currentUser.FriendIDs)
            // if (currentUser.FriendIDs !== "")
            ////     currentUserFriends = currentUser.FriendIDs.split(",")
            //     currentUserFriends = friendStrToArr(currentUser.FriendIDs)
            for (let i = 0; i < currentUserFriends.length; i++){
                console.log(currentUserFriends[i])
            }
            if (isNewFriend === true){
                // filter through query results and only send array with friends who ARE NOT currently added
                for (let i = 0; i < searchQueryRes.length; i++){
                    let curRes = searchQueryRes[i]
                    let isCurFriend = doesContain(currentUserFriends, curRes.UserID)
                    //let isRequested = doesContain(curRes.FriendReqIDs.split(','), currentUser.UserID)
                    let isRequested = doesContain(friendStrToArr(curRes.FriendReqIDs), currentUser.UserID)
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
    console.log("currentUser Friends: " + currentUser.FriendIDs)
    const curUserFriendIDs = cleanFriendStr(currentUser.FriendIDs)
    if (curUserFriendIDs === ""){
        res.status(201).send([])
        return
    }
    const query = `SELECT * FROM User WHERE UserID IN (${curUserFriendIDs});`
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

// Controller function for GET request to '/userFriend/getUserFriendReqs'
exports.getFriendReqOfUser = async (req, res) => {
    const currentUser = JSON.parse(req.query.curUser)
    if (currentUser.FriendReqIDs === "") res.status(201).send([])
    const curUserFriendReqIDs = cleanFriendStr(currentUser.FriendReqIDs)
    const query = `SELECT * FROM User WHERE UserID IN (${curUserFriendReqIDs})`
    console.log("in getFriendReqs: " + query)
    DBConn.query(query, (err, queryRes) => {
        if (err != null) {
            console.log(err)
            res.status(500).send("Unsuccessful retrieval of user's friend requests!")
        } else {
            res.status(201).send(queryRes)
        }
    })
}

// Controller function for PATCH request to '/userFriend/acceptFrdReq'
exports.acceptFriendReq = async (req, res) => {
    console.log("in acceptFriendReq")
    let success = true
    const curUserID = req.body.curUserID
    const newFriendUserID = req.body.friendUserID
    // query1 to add curUserID to newFriendOfUser
    const query1 = `UPDATE User SET FriendIDs = CONCAT(CONCAT(FriendIDs, \",\"), ${curUserID}) WHERE Username = \"${newFriendUserID}\";`
    console.log(query1)
    DBConn.query(query1, (err) => {
        if (err != null) {
            console.log(err)
            res.status(500).send("Unsuccessful acceptance of friend request!")
            success = false
        }
    })
    if (success === false) return
    // query2 to add newFriendUserID to curUser
    const query2 = `UPDATE User SET FriendIDs = CONCAT(CONCAT(FriendIDs, \",\"), ${newFriendUserID}) WHERE Username = \"${curUserID}\";`
    console.log(query2)
    DBConn.query(query2, (err) => {
        if (err != null) {
            console.log(err)
            res.status(500).send("Unsuccessful acceptance of friend request!")
            success = false
        }
    })
    if (success === false) return
    // remove friend requests

    // const url = "http://localhost:4000/userFriend/removeFrdReq"
    // success = await fetch(url,
    //     {
    //         method: "PATCH",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({curUserID, newFriendUserID})
    //     })
    //     .then((res) => {
    //         console.log(res)
    //         return res.status === 201
    //     })
    //     .catch((err) => err);
    // if (success) res.status(201).send()
    // res.status(500).send("Unsuccessful removal of friend request!")
}

// Controller function for PATCH request to '/userFriend/removeFrdReq'
exports.denyFriendReq = async (req, res) => {
    console.log("in denyFriendReq")
    let success = true
    const curUserID = req.body.curUserID
    const newFriendUserID = req.body.friendUserID
    await removeFriendRequest(curUserID, newFriendUserID)
}

function getUserFromID(userID) {
    const query = `SELECT * FROM User WHERE UserID = ${userID}`
    return new Promise((resolve, reject) => {
        DBConn.query(query, (err, queryRes) => {
            if (err != null) reject(err)
            const result = JSON.parse(JSON.stringify(queryRes[0]))
            resolve(result)
        });
    })
}

async function removeFriendRequest(IDToRemoveFrom, IDToRemove) {
    console.log("in local removeFriendRequest")
    const user = await getUserFromID(IDToRemoveFrom)
    let userFriends = friendStrToArr(user.FriendReqIDs)
    userFriends = removeElementByVal(userFriends, IDToRemove)
    const newFriendStr = friendArrToStr(userFriends)
    const query = `UPDATE User SET FriendReqIDs = ${newFriendStr} WHERE Username = ${IDToRemoveFrom}`
    console.log(query)
}

// Helper method to cast Friend Array to Friend String
function friendArrToStr(friendArr){
    let result = ""
    if (friendArr === null || friendArr.length === 0) return result
    for (let i = 0; i < friendArr.length; i++) result += `,${friendArr[i]}`
    return result
}

// Helper method to cast Friend String to Friend Array
function friendStrToArr(friendStr){
    if (friendStr === "") return []
    return friendStr.split(",").slice(1)
}

// Helper method to clean up Friend String input for queries
function cleanFriendStr(friendStr){
    if (friendStr.length < 2) return friendStr
    if (friendStr[0] === ',') return friendStr.substring(1)
    return friendStr
}

