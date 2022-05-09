
export default class PostObj {
    constructor(postID, username, title, content, likes, comments) {
        this.postID = postID;
        this.username = username;
        this.title = title;
        this.content = content;
        this.likes = likes
        this.comments = comments;
    }

    toString() {
        return this.postID + "\n" +
            this.username + "\n" +
            this.title + "\n" +
            this.content + "\n" +
            this.likes + "\n" +
            this.comments
    }

}
