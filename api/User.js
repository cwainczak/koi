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

module.exports = {
    getUserFromID
}