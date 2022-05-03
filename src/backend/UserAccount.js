import {sendEmail} from "./Util";
import UserObj, {setCurUser} from "./UserObj";

// add
export const createUserAcc = async (entEmail, entUser, entPass) => {
    return await fetch("http://localhost:4000/userAccount/add",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({entEmail, entUser, entPass})
        }
    ).then((res) => {
        return res.status === 201
    }).catch((err) => {
        console.log(err)
        return false
    });
}

// verify
export const login = async (entUser, entPass) => {
    const url = "http://localhost:4000/userAccount/verify?" + new URLSearchParams({entUser, entPass})
    const result = await fetch(url,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        .then((res) => {
            return res.json().then(data => data)
        })
        .catch((err) => {
            console.log(err)
            return -2
        });
    console.log(result)
    if (result === -2) return -2
    if (result.length === 1){
        // update current user in UserObj
        let someCurUser = result[0]
        setCurUser(new UserObj(someCurUser.UserID, someCurUser.Email, someCurUser.Username, someCurUser.Password, someCurUser.FriendIDs, someCurUser.FriendReqIDs))
        // return ID
        let curUserID = someCurUser.UserID
        console.log("curUserID: " + curUserID)
        return curUserID
    }
    else {
        console.log("Wrong Login Credentials!")
        return -1
    }
}

// regCheck
export const registrationCheck = async (entEmail, entUser) => {
    const url = "http://localhost:4000/userAccount/regcheck?" + new URLSearchParams({entEmail, entUser})
    const result = await fetch(url,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        .then((res) => {
            return res.json().then(data => data)
        })
        .catch((err) => {
            console.log(err)
            return -1
        });
    console.log(result)
    return result
}

export const sendPasswordCode = async (entEmail) => {
    const url = "http://localhost:4000/userAccount/verCode?" + new URLSearchParams({entEmail})
    const result = await fetch(url,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        .then((res) => {
            return res.json().then(data => data)
        })
        .catch((err) => {
            console.log(err)
            return -1
        });
    if (result.validEmail){
        const emailResult = await sendEmail(result.emailJSData)
        result.emailSent = emailResult.status === 200;
    }
    console.log(result)
    return result
}

export const resetPassword = async (userEmail, newPass) => {
    const result = await fetch("http://localhost:4000/userAccount/resetPass",
        {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userEmail, newPass})
        })
        .then((res) => {
            console.log(res)
            return res.status === 200
        })
        .catch((err) => {
            console.log(err)
            return false
        });
    console.log(result)
    return result
}

// delete
export const deleteUserAcc = async (userID) => {
    return await fetch("http://localhost:4000/userAccount/delete",
        {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userID})
        }
    ).then((res) => {
        return res.json().then(data => data)
    }).catch((err) => {
        console.log(err);
        return false;
    });
}
