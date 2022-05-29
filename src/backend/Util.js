
import emailJS from "@emailjs/browser";

// removes whitespace from beginning and end of string
export function removeWhiteSpace(s){
    return s.trim()
}

export function validateEmail(someEmail){
    return String(someEmail)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export const sendEmail = async (someEmailJSData) => {
    console.log(someEmailJSData)
    const serviceID = someEmailJSData.serviceID
    const templateID = someEmailJSData.templateID
    const templateParams = someEmailJSData.templateParams
    const userID = someEmailJSData.userID

    return await emailJS.send(serviceID, templateID, templateParams, userID)
        .then((res) => {
            console.log("Email sent successfully!")
            console.log(res.text)
            return res
        })
        .catch((err) => {
            console.log("Email failed to send!")
            console.log(err)
            return err
        })
}

/**
 * Helper method to cast UserID String to UserID Array
 * @param UserIDsSTR -> A String matching the format of UserID TEXTs in the User & Post table
 * @returns {*[]|*} -> An array corresponding to the UserIDStr
 */
export function UserIDTEXTStrToArr(UserIDsSTR){
    console.log(UserIDsSTR)
    if (UserIDsSTR === "") return []
    return UserIDsSTR.split(",").slice(1)
}

// checks if an array contains some value, regardless of type
export function doesContain(someArr, someValue){
    for (let i = 0; i < someArr.length; i++){
        //console.log("someArr[${i}]: " + someArr[i] + " and is of type " + typeof(someArr))
        //console.log("someValue[${i}]: " + someValue + " and is of type " + typeof(someValue))
        if (someArr[i] == someValue) return true
    }
    return false
}

/**
 * A function to shuffle an array. Used to populate a shuffled feed.
 * @param someArr -> The array being shuffled
 * @returns If successful -> A shuffled array
 *          If unsuccessful -> -1
 */
export function shuffleArray(someArr){
    if (someArr === null) return -1
    if (someArr.length <= 1) return someArr
    let currentIndex = someArr.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [someArr[currentIndex], someArr[randomIndex]] = [someArr[randomIndex], someArr[currentIndex]];
    }
    return someArr;
}