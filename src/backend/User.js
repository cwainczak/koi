
// add
export const createUserAcc = async (entEmail, entUser, entPass) => {
    return await fetch("http://localhost:4000/users/add",
        {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({entEmail, entUser, entPass})
        }
    ).then((res) => {
        return res.status === 201
    }).catch((err) => err);
}

// verify
export const login = async (entUser, entPass) => {
    const url = "http://localhost:4000/users/verify?" + new URLSearchParams({entUser, entPass})
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
        .catch((err) => err);
    console.log(result)
    if (result.length === 1){
        let curUserID = result[0].UserID
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
    const url = "http://localhost:4000/users/regcheck?" + new URLSearchParams({entEmail, entUser})
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
        .catch((err) => err);
    console.log(result)
    return result
}