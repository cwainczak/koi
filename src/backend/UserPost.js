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
    const url = "http://localhost:4000/userPost/getPosts?" + new URLSearchParams({userID});

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

// like post
export const likePost = async (curUserID) => {
    
}
