const User = require("./User")
const database = require("./Database");

async function userLikedPost(postID, userID) {
    const likeIDsFetchRes = await getPostLikeIDs(postID)
    console.log(likeIDsFetchRes)
}

/**
 * @param postID -> The PostID of the desired Post entry
 * @returns If successful: The value of the LikeIDs field of the specified Post as a String
 *          If unsuccessful: -1
 */
async function getPostLikeIDs(postID) {
    const queryResult = await database.getDatabaseValues("Post", ["LikeIDs"], "PostID", postID)
    if (queryResult === -1) return -1
    return queryResult.LikeIDs
}

module.exports = {
    userLikedPost
}