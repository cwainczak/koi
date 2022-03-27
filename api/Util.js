/*
When hashing with BCrypt, a new salt is generated, used, and stored within the hash.
When comparing a password to its hash, it uses the stored salt in the hash to hash the plain text password.
This will yield the same hash if the plain text password is correct.
TLDR: same salts, same plain text password, same hash
 */

const emailJS = require("@emailjs/browser")

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

const sendEmail = async (email, username, passcode) => {
    /*const data = {
        service_id: 'service_na87syf',
        template_id: 'template_9602m57',
        user_id: '7MsNA5X-6xHY1DK_m',
        template_params: {
            'username': 'James',
            'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
        }
    };
    fetch ('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).then((res) => res).catch((err) => err)*/
    const serviceID = "service_na87syf"
    const templateID = "template_9602m57"
    const templateParams = {
        to_email: email,
        to_name: username,
        passcode: passcode
    }
    const userID = "7MsNA5X-6xHY1DK_m"

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

        /*e.preventDefault();

        emailJS.sendForm('gmail', 'youtube_template', e.current, '7MsNA5X-6xHY1DK_m')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });*/
}

module.exports = {
    hashString,
    compareStringToHash,
    genPassCode,
    sendEmail
}



