// add
export const createUserPost = async (userID, entTitle, entContent) => {
    return await fetch("http://localhost:4000/userPost/add",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userID, entTitle, entContent})
        }
    ).then((res) => {
        return res.status === 201
    }).catch((err) => {
        console.log(err)
        return false
    });
}

// get user posts
export const getUserPosts = async (userID) => {
    const url = "http://localhost:4000/userPost/getUsersPosts?" + new URLSearchParams({userID});

    return await fetch(url,
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
        });
}

// get user's friends' posts
export const getUserFriendsPosts = async (userID) => {
    const url = "http://localhost:4000/userPost/getUserFrdsPosts?" + new URLSearchParams({userID});

    return await fetch(url,
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
}

// get post comments
export const getPostComments = async (postID) => {
    const url = "http://localhost:4000/userPost/getPostComments?" + new URLSearchParams({postID});

    return await fetch(url,
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
        });
}


// delete post
export const deletePost = async (postID) => {
    return await fetch("http://localhost:4000/userPost/delete",
        {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({postID})
        }
    ).then((res) => {
        return res.json().then(data => data)
    }).catch((err) => {
        console.log(err);
        return false;
    });
}

// add comment
export const createPostComment = async (postID, commenterID, entContent) => {
    return await fetch("http://localhost:4000/userPost/addComment",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({postID, commenterID, entContent})
        }
    ).then((res) => {
        return res.status === 204
    }).catch((err) => {
        console.log(err)
        return false
    });
}

// like post
export const likePost = async (postID, curUserID) => {
    return await fetch("http://localhost:4000/userPost/like",
        {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({postID, curUserID})
        }
    ).then((res) => {
        return res.json().then(data => data)
    }).catch((err) => {
        console.log(err);
        return false;
    });
}

// get number of comments
export const getNumUserComments = async (userID) => {
    const url = "http://localhost:4000/userPost/numComments?" + new URLSearchParams({userID});

    return await fetch(url,
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
        });
}

// get number of comments
export const getNumUserFriends = async (userID) => {
    const url = "http://localhost:4000/userPost/numFriends?" + new URLSearchParams({userID});

    return await fetch(url,
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
        });
}
