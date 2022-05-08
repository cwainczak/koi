const DBConn = require("./Database");

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

module.exports = {
    getUserFromID,
    getUserIDFromUsername,
    UserIDTEXTStrToArr,
    UserIDArrToTEXTStr,
    cleanUserIDsStr
}