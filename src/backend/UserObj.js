
export let curUser

export default class UserObj {
    constructor(someUserID, someEmail, someUsername, somePassword, someFriendIDs, someFriendReqIDs) {
        this.UserID = someUserID;
        this.Email = someEmail;
        this.Username = someUsername;
        this.Password = somePassword;
        this.FriendIDs = someFriendIDs;
        this.FriendReqIDs = someFriendReqIDs;
    }
}