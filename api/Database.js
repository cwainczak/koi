const mysql = require("mysql2")
const util = require("./Util")
const {isANumber} = require("./Util");

const DBInfo = {
    // AWS RDS CONNECTION
    host: "capstone-project-database.chiatuqrxopy.us-east-1.rds.amazonaws.com",
    user: "amircooper",
    password: "!capstoneproject2124",
    database: "mydb"
    // LOCALHOST CONNECTION
    // host: "localhost",
    // user: "root",
    // password: "root",
    // database: "mydb"
}

// create connection
const conn = mysql.createConnection(DBInfo)

/**
 * Simple Database function to return values of specified table and column(s)
 * @param tableStr -> Name of the table data is being pulled from as a String
 * @param columnNamesStrArr -> A String Array that holds column name(s) of the columns we are pulling from
 * @param whereColumn -> A String representing the column in the query's WHERE clause, null if there is no WHERE clause
 * @param whereValue -> A String or Number representing the value in the query's WHERE clause, null if there is no WHERE clause
 * @returns {Promise<unknown>} -> If success: JSON with values pertaining to specified columns from specified table
 *                                If unsuccessful: -1
 */
function getDatabaseValues(tableStr, columnNamesStrArr, whereColumn, whereValue) {
    return new Promise((resolve, reject) => {
        const columnString = util.arrToString(columnNamesStrArr)
        if (columnString === "") {
            console.log("No specified columns")
            reject(-1)
        }
        let isWhereClause = true
        if (whereColumn === null && whereValue === null) isWhereClause = false
        else if (whereColumn === null || whereValue === null) {
            console.log("WHERE column or WHERE value is null. Invalid arguments.")
            reject(-1)
        } else if (util.isAString(whereValue)) whereValue = `\"${whereValue}\"`
        else if (!util.isANumber(whereValue)) {
            console.log("WHERE value is not a String nor a Number. Invalid data type.")
            reject(-1)
        }
        let query = `SELECT ${columnString} FROM ${tableStr} `
        isWhereClause ? (query += `WHERE ${whereColumn} = ${whereValue}`) : (console.log("No WHERE clause detected"))
        conn.query(query, (err, queryRes) => {
            if (err != null) {
                console.log(err)
                reject(-1)
            }
            const result = JSON.parse(JSON.stringify(queryRes))
            resolve(result)
        });
    })
}

// export connection for use in other files
module.exports = {
    conn,
    getDatabaseValues
}