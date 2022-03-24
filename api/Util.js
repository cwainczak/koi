
const bcrypt = require("bcrypt")
// the higher the rounds, the more secure, but the longer it takes to generate
const ROUNDS = 5

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



