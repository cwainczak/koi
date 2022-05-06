/*
When hashing with BCrypt, a new salt is generated, used, and stored within the hash.
When comparing a password to its hash, it uses the stored salt in the hash to hash the plain text password.
This will yield the same hash if the plain text password is correct.
TLDR: same salts, same plain text password, same hash
 */

const bcrypt = require("bcrypt")
// the higher the rounds, the more secure, but the longer it takes to generate
const ROUNDS = 5

const hashString = async (someString) => {
    return await bcrypt.hash(someString, ROUNDS)
}

const compareStringToHash = async (someString, someHash) => {
    return await bcrypt.compare(someString, someHash)
}

const genPassCode = async () => {
    const min = 100000
    const max = 999999
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// checks if an array contains some value, regardless of type
function doesContain(someArr, someValue){
    for (let i = 0; i < someArr.length; i++){
        //console.log("someArr[${i}]: " + someArr[i] + " and is of type " + typeof(someArr))
        //console.log("someValue[${i}]: " + someValue + " and is of type " + typeof(someValue))
        if (someArr[i] == someValue) return true
    }
    return false
}

module.exports = {
    hashString,
    compareStringToHash,
    genPassCode,
    doesContain
}



