const mysql = require("mysql2")
const util = require("./Util")

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
 * Generic Database function to return values of specified table and column(s)
 * @param tableStr -> Name of the table data is being pulled from as a String
 * @param columnNamesStrArr -> A String Array that holds column name(s) of the columns being pulled from
 * @param whereColumn -> A String representing the column in the query's WHERE clause, null if there is no WHERE clause
 * @param whereValue -> A String or Number representing the value in the query's WHERE clause, null if there is no WHERE clause
 * @returns {Promise<unknown>} -> If success: JSON with values pertaining to specified columns from specified table
 *                                If unsuccessful: -1
 */
function readDatabaseValues(tableStr, columnNamesStrArr, whereColumn, whereValue){
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

/**
 * A generic function to fetch database values based on a passed in query
 * @param query -> The query we are running to fetch database values
 * @return {Promise<unknown>} -> If successful: The result returned by the database after running the query
 *                            -> If unsuccessful: -1
 */
function readCustomDatabaseValues(query){
    return new Promise((resolve, reject) => {
        if (query === null || query.trim() === "") reject(-1)
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

/**
 * Generic Database function to write values to specified table and column
 * @param tableStr -> Name of the table data is written to as a String
 * @param columnToChangeStr -> A String representing the column name of the column being changed
 * @param newValue -> A String or Double representing the new value of the column being updated
 * @param whereColumn -> A String representing the column in the query's WHERE clause, null if there is no WHERE clause
 * @param whereValue -> A String or Number representing the value in the query's WHERE clause, null if there is no WHERE clause
 * @return {Promise<unknown>} If success: true, indicating that the operation was successful
 *                            If unsuccessful: false, indicating that the operation was unsuccessful
 */
function writeDatabaseValues(tableStr, columnToChangeStr, newValue, whereColumn, whereValue){
    return new Promise((resolve, reject) => {
        columnToChangeStr = columnToChangeStr.trim()
        if (columnToChangeStr === ""){
            console.log("No specified column to update")
            reject(false)
        }
        if (whereColumn === null || whereValue === null){
            console.log("WHERE column or WHERE value is null. Invalid arguments.")
            reject(false)
        }
        if (util.isAString(newValue)) newValue = `\"${newValue}\"`
        else if (!util.isANumber(newValue)){
            console.log("New value is not a String nor a Number. Invalid data type.")
            reject(false)
        }
        if (util.isAString(whereValue)) whereValue = `\"${whereValue}\"`
        else if (!util.isANumber(whereValue)){
            console.log("WHERE value is not a String nor a Number. Invalid data type.")
            reject(false)
        }
        let query = `UPDATE ${tableStr} SET ${columnToChangeStr} = ${newValue} WHERE ${whereColumn} = ${whereValue}`
        conn.query(query, (err) => {
            if (err != null){
                console.log(err)
                reject(false)
            }
            resolve(true)
        });
    })
}

// export connection for use in other files
module.exports = {
    conn,
    readDatabaseValues,
    readCustomDatabaseValues,
    writeDatabaseValues
}