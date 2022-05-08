
const DBConn = require("../Database")
const User = require("../User")
const {doesContain, removeElementByVal} = require("../Util");
const {getUserIDFromUsername} = require("../User");

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
    if (curUserFriendIDs.trim() === ""){
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
    if (currentUser.FriendReqIDs === ""){
        res.status(201).send([])
        return
    }
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
    const curUserID = req.body.curUserID
    const friendUserID = req.body.friendUserID
    const success = await updateFriendStatus(curUserID, friendUserID, false, false) &&
                    await updateFriendStatus(friendUserID, curUserID, false, false) &&
                    await updateFriendStatus(curUserID, friendUserID, true, true) &&
                    await updateFriendStatus(friendUserID, curUserID, true, true)
    success ? (res.status(201).send()) : (res.status(500).send())
}

// Controller function for PATCH request to '/userFriend/removeFrdReq'
exports.denyFriendReq = async (req, res) => {
    console.log("in denyFriendReq")
    const curUserID = req.body.curUserID
    const friendUserID = req.body.friendUserID
    const success = await updateFriendStatus(curUserID, friendUserID, true, true)
    console.log("is success true? -> " + success)
    success ? (res.status(201).send()) : (res.status(500).send())
}

// Controller function for PATCH request to '/userFriend/removeFriend'
exports.removeFriend = async (req, res) => {
    console.log("in remove friend")
    const curUserID = req.body.curUserID
    //const friendUsername = req.friendUsername
    //const friendID = await getUserIDFromUsername(friendUsername)
    const friendID = req.body.friendID
    const success = await updateFriendStatus(curUserID, friendID, true, false) &&
                    await updateFriendStatus(friendID, curUserID, true, false)
    success ? (res.status(201).send()) : (res.status(500).send())
}

/**
 * A generic function to update the User table in regard to their friendships
 * @param updateFromID -> The UserID of the entry we are updating
 * @param updateID -> The UserID we are using in the update of the entry
 * @param isRemoval -> Is this update a removal of a friend property? Or an addition?
 * @param isFrdReq -> Is this update friend-request oriented? Or friend-oriented?
 * @returns boolean -> Did this function succeed? Or fail?
 */
async function updateFriendStatus(updateFromID, updateID, isRemoval, isFrdReq) {
    console.log("in local updateFriendStatus")
    const user = await User.getUserFromID(updateFromID)
    let userField = friendStrToArr(isFrdReq ? (user.FriendReqIDs) : (user.FriendIDs))
    if (isRemoval) userField = removeElementByVal(userField, updateID)
    else userField.push(updateID)
    const newUserFieldStr = friendArrToStr(userField)
    const query = `UPDATE User SET ${isFrdReq ? ("FriendReqIDs") : ("FriendIDs")} = \"${newUserFieldStr}\" WHERE UserID = ${updateFromID}`
    return new Promise((resolve, reject) => {
        DBConn.query(query, (err) => {
            if (err != null) reject(err)
            else resolve(true)
        })
    })
}

/**
 * Helper method to cast Friend Array to Friend String
 * @param friendArr -> An array of FriendIDs
 * @returns {string} -> A String matching the format of Friends in the User table
 */
function friendArrToStr(friendArr){
    let result = ""
    if (friendArr === null || friendArr.length === 0) return result
    console.log("in friendArrToStr: " + friendArr.toString())
    console.log("friendArr.length: " + friendArr.length)
    for (let i = 0; i < friendArr.length; i++) result += `,${friendArr[i]}`
    return result
}

/**
 * Helper method to cast Friend String to Friend Array
 * @param friendStr -> A String matching the format of Friends in the User table
 * @returns {*[]|*} -> An array corresponding to the friendStr
 */
function friendStrToArr(friendStr){
    if (friendStr === "") return []
    return friendStr.split(",").slice(1)
}

/**
 * Helper method to clean up Friend String input for queries
 * @param friendStr -> A String matching the format of Friends in the User table
 * @returns {string|*} -> A cleaned-up version of friendStr for queries that may yield syntax errors from friendStr
 */
function cleanFriendStr(friendStr){
    if (friendStr.length < 2) return friendStr
    if (friendStr[0] === ',') return friendStr.substring(1)
    return friendStr
}

