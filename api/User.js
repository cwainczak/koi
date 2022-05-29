const database = require("./Database");
const {doesContain, removeElementByVal, isANumber} = require("./Util");
const DBConn = database.conn

function getUserFromID(userID) {
    const query = `SELECT * FROM User WHERE UserID = ${userID}`
    return new Promise((resolve, reject) => {
        DBConn.query(query, (err, queryRes) => {
            if (err != null){
                console.log(err)
                reject(-1)
            }
            const result = JSON.parse(JSON.stringify(queryRes[0]))
            resolve(result)
        });
    })
}

function getUserIDFromUsername(username){
    const query = `SELECT UserID FROM User WHERE Username = ${username}`
    return new Promise((resolve, reject) => {
        DBConn.query(query, (err, queryRes) => {
            if (err != null){
                console.log(err)
                reject(-1)
            }
            resolve(queryRes[0])
        });
    })
}

/**
 * Gets all friends of a User specified by UserID
 * @param userID -> The UserID of the User we are looking at
 * @returns -> If successful -> An array of UserIDs of a User's friends
 */
async function getUserFriendsByUserID(userID) {
    if (userID === null || !isANumber(userID) || userID < 0) {
        console.log("Invalid UserID!")
        return -1
    }
    const DBRes = await database.readDatabaseValues("User", ["FriendIDs"], "UserID", userID)
    if (DBRes === -1) return -1
    return UserIDTEXTStrToArr(DBRes[0].FriendIDs)
}

/**
 * Helper method to cast UserID Array to UserID String
 * @param UserIDsArr -> An array of UserIDs
 * @returns {string} -> A String matching the format of UserID TEXTs in the User & Post table
 */
function UserIDArrToTEXTStr(UserIDsArr){
    let result = ""
    if (UserIDsArr === null || UserIDsArr.length === 0) return result
    console.log("in friendArrToStr: " + UserIDsArr.toString())
    console.log("friendArr.length: " + UserIDsArr.length)
    for (let i = 0; i < UserIDsArr.length; i++) result += `,${UserIDsArr[i]}`
    return result
}

/**
 * Helper method to cast UserID String to UserID Array
 * @param UserIDsSTR -> A String matching the format of UserID TEXTs in the User & Post table
 * @returns {*[]|*} -> An array corresponding to the UserIDStr
 */
function UserIDTEXTStrToArr(UserIDsSTR){
    if (UserIDsSTR === "") return []
    return UserIDsSTR.split(",").slice(1)
}

/**
 * Helper method to clean up UserID String input for queries
 * @param UserIDsSTR -> A String matching the format of UserID TEXTs in the User & Post table
 * @returns {string|*} -> A cleaned-up version of UserIDsSTR for queries that may yield syntax errors from original UserIDsSTR
 */
function cleanUserIDsStr(UserIDsSTR){
    if (UserIDsSTR.length < 2) return UserIDsSTR
    if (UserIDsSTR[0] === ',') return UserIDsSTR.substring(1)
    return UserIDsSTR
}

/**
 * Helper method to perform an action, either Add or Remove, on a UserIDs String (e.g. ,1,3,4), such as FriendIDs in the User table
 * @param userIDsStr -> The String we are performing the Action on
 * @param isAdd -> True if this action is an addition of the UserIDToUpdate; False if this action is a removal
 * @param userIDToUpdate -> The UserID value that we are taking the action on (addition: add UserID to UserIDsStr; removal: remove UserID from UserIDsStr)
 * @returns -> If successful: The new updated String
 *          -> If unsuccessful: -1
 */
function performActionOnUserIDsStr(userIDsStr, isAdd, userIDToUpdate){
    let userIDsArr = UserIDTEXTStrToArr(userIDsStr)
    if ((userIDsArr.length === 0 && !isAdd) || (!isAdd && !doesContain(userIDsArr, userIDToUpdate))) return -1
    isAdd ? (userIDsArr.push(userIDToUpdate)) : (userIDsArr = removeElementByVal(userIDsArr, userIDToUpdate))
    return UserIDArrToTEXTStr(userIDsArr)
}

module.exports = {
    getUserFromID,
    getUserIDFromUsername,
    UserIDTEXTStrToArr,
    UserIDArrToTEXTStr,
    cleanUserIDsStr,
    performActionOnUserIDsStr,
    getUserFriendsByUserID
}