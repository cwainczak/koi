const DBConn = require("../Database")

// controller function for POST request to '/userPost/add'
exports.addUserPost = async (req, res) => {
    let userID = req.body.userID;
    let title = req.body.entTitle;
    let content = req.body.entContent;

    const query = "INSERT INTO Post (UserID, Title, Content, Likes, LikeIDs) " +
        "VALUES (" + userID + ", \"" + title + "\", \"" + content + "\", 0, \"\");"

    console.log(query);

    DBConn.query(query, (err) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful post creation!");
        } else {
            res.status(201).send("Successfully added post!")
        }
    })
}

// controller function for GET request to '/userPost/getPosts'
exports.getPosts = async (req, res) => {
    let userID = req.query.userID;

    const query = "SELECT * FROM Post Where UserID = " + userID + ";"

    console.log(query);
    DBConn.query(query, async (err, allPosts) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful retrieval of posts!");
        } else {
            let result = [];

            for (let i = 0; i < allPosts.length; i++) {
                let curPost = allPosts[i];
                result.push(curPost);
            }
            res.status(201).json(result);
        }
    })
}

// controller function for GET request to '/userPost/getPostComments'
exports.getPostComments = async (req, res) => {
    let postID = req.query.postID;

    const query = `SELECT u.Username, c.Content FROM Comment c JOIN User u ON c.CommenterID = u.UserID WHERE c.PostID =  ${postID}`

    console.log(query);
    DBConn.query(query, async (err, allComments) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful retrieval of post comments!");
        } else {
            let result = [];

            for (let i = 0; i < allComments.length; i++) {
                let curComment = allComments[i];
                result.push(curComment);
            }
            res.status(201).json(result);
        }
    })
}

// controller function for the DELETE request to '/userPost/delete'
exports.deletePost = async (req, res) => {
    let fullResult = {
        commentsDeleted: true,
        postDeleted: true
    }

    let postID = req.body.postID;

    // delete post comments
    const commentQuery = "DELETE FROM Comment WHERE PostID = " + postID + ";"

    console.log(commentQuery);
    DBConn.query(commentQuery, (err, commentQueryRes) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful comment deletion!");
        } else {
            if (commentQueryRes.length >= 1) {
                fullResult.commentsDeleted = true;
            }
        }
    })

    // delete post
    const postQuery = "DELETE FROM Post WHERE PostID = " + postID + ";"

    console.log(postQuery);
    DBConn.query(postQuery, (err, postQueryRes) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful post deletion!");
        } else {
            if (postQueryRes.length >= 1) {
                fullResult.userDeleted = true;
            }
            res.status(201).json(fullResult);
        }
    })
}

// Controller function for PATCH request at endpoint '/userPost/like'
exports.likeUserPost = async (req, res) => {
    let fullResult = {
        likeActionSucceeded: false,
        likeCount: -1
    }
    const postID = req.body.postID
    const curUserID = req.body.curUserID


}
