
// gets user search results
// newFriend -> boolean that determines if we are searching for new friend or current friends
export const getUserSearchRes = async (searchInput, isNewFriend, curUser) => {
    console.log("isNewFriend: " + isNewFriend)
    const url = "http://localhost:4000/userFriend/search?" + new URLSearchParams({searchInput, isNewFriend, curUser})
    return await fetch(url,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
    ).then((res) => {
        return res.json().then(data => data)
    }).catch((err) => {
        console.log(err)
        return -1
    });

}

// gets all friends of user
export const getAllUserFriends = async (curUser) => {
    const url = "http://localhost:4000/userFriend/getUserFrds?" + new URLSearchParams({curUser})
    return await fetch(url,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
    ).then((res) => {
        return res.json().then(data => data)
    }).catch((err) => {
        console.log(err)
        return -1
    });
}

// add user as friend from current account
export const sendFriendReq = async (curUserID, newFriendUsername) => {
    const result = await fetch("http://localhost:4000/userFriend/sendFrdReq",
        {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({curUserID, newFriendUsername})
        })
        .then((res) => {
            console.log(res)
            return res.status === 204
        })
        .catch((err) => err);
    console.log(result)
    return result
}

// get all friend requests of user
export const getFriendReqs = async (curUser) => {
    const url = "http://localhost:4000/userFriend/getUserFriendReqs?" + new URLSearchParams({curUser})
    return await fetch(url,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
    ).then((res) => {
        return res.json().then(data => data)
    }).catch((err) => {
        console.log(err)
        return -1
    });
}

// accept friend request
export const acceptFriendRequest = async (curUserID, friendUserID) => {
    const url = "http://localhost:4000/userFriend/acceptFrdReq"
    const result = await fetch(url,
        {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({curUserID, friendUserID})
        })
        .then((res) => {
            console.log(res)
            return res.status === 201
        })
        .catch((err) => err);
    console.log(result)
    return result
}

// deny friend request
export const denyFriendRequest = async (curUserID, friendUserID) => {
    const url = "http://localhost:4000/userFriend/denyFrdReq"
    const result = await fetch(url,
        {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({curUserID, friendUserID})
        })
        .then((res) => {
            console.log(res)
            return res.status === 201
        })
        .catch((err) => err);
    console.log(result)
    return result
}

// delete current friend
export const removeFriend = async (curUserID, friendID) => {
    const url = "http://localhost:4000/userFriend/removeFriend"
    const result = await fetch(url,
        {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({curUserID, friendID})
        })
        .then((res) => {
            console.log(res)
            return res.status === 201
        })
        .catch((err) => err);
    console.log(result)
    return result
}