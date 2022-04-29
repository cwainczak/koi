
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
    const url = "http://localhost:4000/userFriend/getUserFriends?" + new URLSearchParams({curUser})
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
export const addNewFriend = async (curUserID, newFriendUsername) => {
    console.log("in backend of project")
    const result = await fetch("http://localhost:4000/userFriend/addFriend",
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
            return res.status === 200
        })
        .catch((err) => err);
    console.log(result)
    return result
}