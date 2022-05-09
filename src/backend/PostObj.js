
export default class PostObj {
    constructor(postID, username, title, content, likes, comments, isLiked) {
        this.postID = postID;
        this.username = username;
        this.title = title;
        this.content = content;
        this.likes = likes
        this.comments = comments;
        this.isLiked = isLiked
    }

    toString() {
        return this.postID + "\n" +
            this.username + "\n" +
            this.title + "\n" +
            this.content + "\n" +
            this.likes + "\n" +
            this.comments + "\n" +
            this.isLiked
    }

}
