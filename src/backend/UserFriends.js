
// gets user search results
// newFriend -> boolean that determines if we are searching for new friend or current friends
export const getUserSearchRes = async (newFriend) => {
    const url = "http://localhost:4000/userFriend/search?" + new URLSearchParams({newFriend})
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
    }).catch((err) => err);

}