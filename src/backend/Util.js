
// removes whitespace from beginning and end of string
import emailJS from "@emailjs/browser";

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

    await emailJS.send(serviceID, templateID, templateParams, userID)
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