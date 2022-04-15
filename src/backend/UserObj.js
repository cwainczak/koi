
export let curUser

export function setCurUser(someCurUser){
    curUser = someCurUser
}

export default class UserObj {

    constructor(someUserID, someEmail, someUsername, somePassword, someFriendIDs, someFriendReqIDs) {
        this.UserID = someUserID;
        this.Email = someEmail;
        this.Username = someUsername;
        this.Password = somePassword;
        this.FriendIDs = someFriendIDs;
        this.FriendReqIDs = someFriendReqIDs;
    }

    toString(){
        console.log("in the toString")
        return "\nUserID: " + this.UserID +
               "\nEmail: " + this.Email +
               "\nUsername: " + this.Username +
               "\nPassword: " + this.Password +
               "\nFriendIDs: " + this.FriendIDs +
               "\nFriendReqIDs: " + this.FriendReqIDs
    }

    toJSON(){
        return {
            UserID: this.UserID,
            Email: this.Email,
            Username: this.Username,
            Password: this.Password,
            FriendIDs: this.FriendIDs,
            FriendReqIDs: this.FriendReqIDs
        }
    }

}