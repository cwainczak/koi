
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

    async refreshInstance() {
        console.log("Refreshing Instance")
        const url = "http://localhost:4000/user/getUser?" + new URLSearchParams({UserID: this.UserID})
        const updatedUser = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
            .then((res) => {
                return res.json().then(data => data)
            })
            .catch((err) => err);
        curUser.UserID = updatedUser.UserID
        curUser.Email = updatedUser.Email
        curUser.Username = updatedUser.Username
        curUser.Password = updatedUser.Password
        curUser.FriendIDs = updatedUser.FriendIDs
        curUser.FriendReqIDs = updatedUser.FriendReqIDs
    }

}