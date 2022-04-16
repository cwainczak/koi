const mysql = require("mysql2")

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

// export connection for use in other files
module.exports = conn