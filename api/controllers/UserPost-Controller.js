const DBConn = require("../Database")

// controller function for POST request to '/userPosts/add'
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
