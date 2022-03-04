
export const createUserAcc = async (entEmail, entUser, entPass) => {
    const isSuccessful = await fetch ("http://localhost:4000/users/add",
        {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({entEmail, entUser, entPass})
            }
    ).then().catch((err) => err)
}