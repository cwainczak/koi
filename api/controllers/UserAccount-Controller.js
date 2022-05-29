const Util = require("../Util");
const DBConn = require("../Database").conn;

// Controller function for POST request to '/users/add'
exports.addUserData = async (req, res) => {
    let email = req.body.entEmail;
    let username = req.body.entUser;
    let hashedPassword = await Util.hashString(req.body.entPass);

    console.log("Hashed password: " + hashedPassword)

    const query = `INSERT INTO User (Email, Username, Password, FriendIDs, FriendReqIDs) VALUES (\"${email}\", \"${username}\", \"${hashedPassword}\", \"\", \"\")`

    console.log(query);
    DBConn.query(query, (err) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful account creation!");
        } else {
            res.status(201).send("Successfully added account!");
        }
    })
}

//  Controller function for GET request to '/users/regcheck'
exports.checkRegUserData = async (req, res) => {
    let fullResult = {emailTaken: false, usernameTaken: false};
    let email = req.query.entEmail;
    let username = req.query.entUser;
    // check email
    const emailQuery = "SELECT Email " +
        "FROM User " +
        "WHERE Email = '" + email + "';"

    console.log(emailQuery);
    DBConn.query(emailQuery, (err, emailQueryRes) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful registration check!");
        } else {
            if (emailQueryRes.length >= 1) {
                fullResult.emailTaken = true;
            }
        }
    })

    // check username
    const usernameQuery = "SELECT Username " +
        "FROM User " +
        "WHERE Username = '" + username + "';"

    console.log(usernameQuery);
    DBConn.query(usernameQuery, (err2, usernameQueryRes) => {
        if (err2 != null) {
            console.log(err2);
            res.status(500).send("Unsuccessful registration check!");
        } else {
            if (usernameQueryRes.length >= 1) {
                fullResult.usernameTaken = true;
            }
            res.status(200).json(fullResult);
        }
    })
}

// Controller function for GET request to '/users/verify'
exports.verifyUserData = async (req, res) => {
    let username = req.query.entUser;
    let password = req.query.entPass;
    const query = "SELECT * FROM User;"

    console.log(query);
    DBConn.query(query, async (err, allUsers) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful account verification!");
        } else {
            let result = [];

            for (let i = 0; i < allUsers.length; i++) {
                let curUser = allUsers[i];
                let checkHash = await Util.compareStringToHash(password, curUser.Password);

                console.log("checkHash = " + checkHash);
                if (curUser.Username === username && checkHash) {
                    result.push(curUser);
                    console.log(result);
                    break;
                }
            }
            res.status(200).json(result);
        }
    })
}

exports.getVerificationCodeData = async (req, res) => {
    let email = req.query.entEmail;
    // first, make sure email is linked to an account
    let fullResult = {validEmail: false, emailJSData: {}, emailSent: false};

    const emailQuery = "SELECT Email, Username " +
        "FROM User " +
        "WHERE Email = '" + email + "';"

    DBConn.query(emailQuery, async (err, emailQueryRes) => {
        console.log(emailQueryRes);
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful registration check!");
        } else {
            if (emailQueryRes.length >= 1) {
                fullResult.validEmail = true;
            }
            // if email is valid
            if (fullResult.validEmail) {
                // generate and set passcode
                const passcode = await Util.genPassCode();
                // set emailjs data so it can be sent to frontend
                fullResult.emailJSData = {
                    serviceID: "service_na87syf",
                    templateID: "template_zokb0jg",
                    templateParams: {
                        to_email: email,
                        to_name: emailQueryRes[0].Username,
                        passcode: passcode
                    },
                    userID: "7MsNA5X-6xHY1DK_m"
                }
            }
            console.log("in user-controller");
            console.log(fullResult);
            res.status(200).json(fullResult);
        }
    })
}

exports.resetPassword = async (req, res) => {
    const userEmail = req.body.userEmail;
    const newPassword = req.body.newPass;
    const hashedNewPassword = await Util.hashString(newPassword);

    console.log(userEmail);
    console.log("Hashed (new) password: " + hashedNewPassword);

    const query = "UPDATE User " +
        "SET Password = '" + hashedNewPassword + "' " +
        "WHERE Email = '" + userEmail + "';"

    console.log(query);
    DBConn.query(query, async (err, updateQueryRes) => {
        console.log(updateQueryRes);
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful password reset!");
        } else {
            res.status(200).send("Successful password reset!");
        }
    })
}

// controller function for DELETE request to '/userAccount/delete'
exports.deleteUser = async (req, res) => {
    let fullResult = {
        commentsDeleted: true,
        conversation1Deleted: true,
        conversation2Deleted: true,
        postsDeleted: true,
        userDeleted: true
    }

    let userID = req.body.userID;

    // delete user comments
    const commentQuery = "DELETE FROM Comment WHERE CommenterID = " + userID + ";"

    console.log(commentQuery);
    DBConn.query(commentQuery, (err, commentQueryRes) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful user comments deletion!");
        } else {
            if (commentQueryRes.length >= 1) {
                fullResult.commentsDeleted = true;
            }
        }
    })

    // delete user conversation 1
    const conversationQuery1 = "DELETE FROM Conversation WHERE UserID1 = " + userID + ";"

    console.log(conversationQuery1);
    DBConn.query(conversationQuery1, (err, conversationQuery1Res) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful user conversation1 deletion!");
        } else {
            if (conversationQuery1Res.length >= 1) {
                fullResult.conversation1Deleted = true;
            }
        }
    })

    // delete user conversation 2
    const conversationQuery2 = "DELETE FROM Conversation WHERE UserID2 = " + userID + ";"

    console.log(conversationQuery2);
    DBConn.query(conversationQuery2, (err, conversationQuery2Res) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful user conversation2 deletion!");
        } else {
            if (conversationQuery2Res.length >= 1) {
                fullResult.conversation2Deleted = true;
            }
        }
    })

    // delete user posts
    const postQuery = "DELETE FROM Post WHERE UserID = " + userID + ";"

    console.log(postQuery);
    DBConn.query(postQuery, (err, postQueryRes) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful user posts deletion!");
        } else {
            if (postQueryRes.length >= 1) {
                fullResult.postsDeleted = true;
            }
        }
    })

    // delete user account
    const userQuery = "DELETE FROM User WHERE UserID = " + userID + ";"

    console.log(userQuery);
    DBConn.query(userQuery, (err2, userQueryRes) => {
        if (err2 != null) {
            console.log(err2);
            res.status(500).send("Unsuccessful user account deletion!");
        } else {
            if (userQueryRes.length >= 1) {
                fullResult.userDeleted = true;
            }
            res.status(200).json(fullResult);
        }
    })
}
