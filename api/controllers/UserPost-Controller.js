const database = require("../Database")
const DBConn = database.conn
const user = require("../User")
const post = require("../Post")

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

// controller function for GET request to '/userPost/getUsersPosts'
exports.getUsersPosts = async (req, res) => {
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
            res.status(200).json(result);
        }
    })
}

// controller function for GET request to '/userPost/getUserFrdsPosts'
exports.getUserFriendsPosts = async (req, res) => {
    const userID = req.query.userID
    const userFriends = await user.getUserFriendsByUserID(parseInt(userID, 10))
    if (userFriends === -1){
        res.status(500).send([])
        return
    }
    const DBRes = await post.getPostsByUserIDs(userFriends)
    if (DBRes === -1){
        res.status(500).send([])
        return
    }
    console.log(DBRes)
    res.status(200).send(DBRes)
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
            res.status(200).json(result);
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
            res.status(200).json(fullResult);
        }
    })
}

// controller function for the POST request to '/userPost/addComment'
exports.addUserComment = async (req, res) => {
    let postID = req.body.postID;
    let commenterID = req.body.commenterID;
    let content = req.body.entContent;

    const query = "INSERT INTO Comment (PostID, CommenterID, Content, Likes) " +
        "VALUES (" + postID + ", \"" + commenterID + "\", \"" + content + "\", \" \");"

    console.log(query);

    DBConn.query(query, (err) => {
        if (err != null) {
            console.log(err);
            res.status(500).send("Unsuccessful comment creation!");
        } else {
            res.status(201).send("Successfully added comment!")
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
    const userLikedPost = await post.userLikedPost(postID, curUserID)
    fullResult.likeActionSucceeded = await post.likeAction(!userLikedPost, postID, curUserID)
    fullResult.likeCount = await post.getPostLikeCount(postID)
    const statusCode = (fullResult.likeActionSucceeded === -1 || fullResult.likeCount === -1) ? (500) : (200)
    res.status(statusCode).send(fullResult)
}

// controller function for the GET request at endpoint "/userPost/numComments"
exports.getNumComments = async (req, res) => {
    let userID = req.query.userID;
    const result = await database.readDatabaseValues("Comment", ["CommentID"], "CommenterID", userID);
    res.status(200).send(result);
}

// controller function for te GET request at endpoint "/userPost/numFriends"
exports.getNumFriends = async (req, res) => {
    let userID = req.query.userID;
    const DBRes = await database.readDatabaseValues("User", ["FriendIDs"], "UserID", userID);
    const userJSON = DBRes[0];
    const friendIDs = userJSON.FriendIDs;
    const result = user.UserIDTEXTStrToArr(friendIDs).length;
    console.log(result)
    res.status(200).send({numFriends: result});
}
