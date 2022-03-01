
// I've tried both var and let
let allUsers = []

// Create async function for fetching users list
const fetchUsers = async () => {
    const users = await fetch("http://localhost:4000/users/all")
    .then(res => {
        const JSONData = res.json().then(data => data)
        return JSONData
    }).catch(err => console.error(err)) // Process the incoming data

    console.log("In fetch users: " + JSON.stringify(users))
    allUsers = users
}

export function initUsers() {
    fetchUsers();
    console.log("In init users: " + JSON.stringify(allUsers));
}

export function handleLogin(){
    console.log("After return: " + JSON.stringify(allUsers))
    // for (let i = 0; i < users.length; i++){
    //     console.log(JSON.stringify(users[i]))
    //     const userData = JSON.parse(users[i])
    //     console.log("It has the username of: " + userData.Username)
    // }
}
