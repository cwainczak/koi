const user = require("./User")
const database = require("./Database");
const {doesContain} = require("./Util");

/**
 * A function that returns if a user liked a post or not, based on postID and userID
 * @param postID -> The PostID of the Post that is being checked
 * @param userID -> The UserID of the Post that is being checked
 * @return boolean -> True if user has already liked the post, False if the user has not
 */
async function userLikedPost(postID, userID) {
    const likeIDsFetchRes = await getPostLikeIDs(postID)
    const likeIDsArr = user.UserIDTEXTStrToArr(likeIDsFetchRes)
    return doesContain(likeIDsArr, userID)
}

/**
 * @param postID -> The PostID of the desired Post entry
 * @returns boolean ->  If successful: The value of the LikeIDs field of the specified Post as a String
 *                      If unsuccessful: -1
 */
async function getPostLikeIDs(postID) {
    const queryResults = await database.readDatabaseValues("Post", ["LikeIDs"], "PostID", postID)
    const queryResult = queryResults[0]
    if (queryResult === -1) return -1
    return queryResult.LikeIDs
}

/**
 * Either likes or unlikes a specified Post as a specified User
 * @param isLike -> True if we are liking a post, False if we are unliking it
 * @param postID -> The PostID of the post that the user is liking or unliking
 * @param userID -> The UserID of the user who is liking or unliking the post
 * @return boolean -> If successful: true
 *                 -> If unsuccessful: false
 */
async function likeAction(isLike, postID, userID){
    console.log("likeAction() isLike: " + isLike)
    console.log("likeAction() postID: " + postID)
    console.log("likeAction() userID: " + userID)
    const postLikeIDsStr = await getPostLikeIDs(postID)
    console.log("likeAction() postLikeIDsStr: " + postLikeIDsStr)
    let newPostLikeIDsStr = (isLike ? (user.performActionOnUserIDsStr(postLikeIDsStr, true, userID)) : (user.performActionOnUserIDsStr(postLikeIDsStr, false, userID)))
    console.log("likeAction() newPostLikeIDsStr: " + newPostLikeIDsStr)
    if (newPostLikeIDsStr === -1) return false
    const likeCount = await getPostLikeCount(postID)
    console.log("likeAction() likeCount: " + likeCount)
    const newLikeCount = (isLike ? (likeCount+1) : (likeCount-1))
    console.log("likeAction() newLikeCount: " + newLikeCount)
    return await database.writeDatabaseValues("Post", "LikeIDs", newPostLikeIDsStr, "PostID", postID) &&
           await database.writeDatabaseValues("Post", "Likes", newLikeCount, "PostID", postID)
}

/**
 * Returns the number of likes on a Post
 * @param postID -> The PostID of the post being looked at
 * @return {Promise<Number>} -> If successful: The number of likes on the post determined by the specified PostID
 *                           -> If unsuccessful: -1
 */
async function getPostLikeCount(postID){
    const likesRes = await database.readDatabaseValues("Post", ["Likes"], "PostID", postID)
    const numCountJSON = likesRes[0]
    return numCountJSON.Likes
}

module.exports = {
    userLikedPost,
    likeAction,
    getPostLikeCount
}