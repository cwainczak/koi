const DBConn = require("../Database")

// controller function for POST request to '/userPost/add'
exports.addUserPost = async (req, res) => {
    let userID = req.body.userID;
    let title = req.body.entTitle;
    let content = req.body.entContent;

    const query = "INSERT INTO Post (UserID, Title, Content, Likes) " +
        "VALUES (" + userID + ", \"" + title + "\", \"" + content + "\", \" \");"

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

    const query = "SELECT * FROM Comment WHERE PostID = " + postID + ";"

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
