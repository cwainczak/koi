
// I've tried both var and let
let allUsers = []

// Create async function for fetching users list
const fetchUsers = async () => {
    const users = await fetch("http://localhost:4000/users/all")
    .then(res => {
        const JSONData = res.json().then(data => data)
        return JSONData
    }).catch(err => console.error(err)) // Process the incoming data

    //console.log("In fetch users: " + JSON.stringify(users))
    allUsers = users
}

export function initUsers() {
    fetchUsers().then().catch()
    console.log("In init users: " + JSON.stringify(allUsers));
}

export function handleLogin(entUser, entPass){
    //console.log("After return: " + JSON.stringify(allUsers))
    for (let i = 0; i < allUsers.length; i++){
        let actUser = allUsers[i].Username
        let actPass = allUsers[i].Password
        console.log("Actual username: " + actUser)
        console.log("Actual password: " + actPass)
        console.log("Entered username: " + entUser)
        console.log("Entered password: " + entPass)
        console.log(actUser === entUser)
        console.log(actPass === entPass)
        if (actUser === entUser && actPass === entPass){
            return true
        }
    }
    return false
    // return allUsers.forEach((someUser) => {
    //     console.log("Actual username: " + someUser.Username)
    //     console.log("Actual password: " + someUser.Password)
    //     console.log("Entered username: " + entUser)
    //     console.log("Entered password: " + entPass)
    //     console.log(someUser.Username === entUser)
    //     console.log(someUser.Username === entUser)
    //     return (someUser.Username === entUser && someUser.Username === entUser);
    // })
}
