//import bcrypt from 'bcrypt'
const bcrypt = require("bcrypt")
const ROUNDS = 10

const hashString = async (someString) => {
    return await bcrypt.hash(someString, ROUNDS)
}

const compareStringToHash = async (someString, someHash) => {
    return await bcrypt.compare(someString, someHash)
}

module.exports = {
    hashString,
    compareStringToHash
}



