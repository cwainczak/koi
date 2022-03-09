
// email and username need to be unique

export const createUserAcc = async (entEmail, entUser, entPass) => {
    return await fetch("http://localhost:4000/users/add",
        {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({entEmail, entUser, entPass})
        }
    ).then(() => true).catch((err) => err);
}