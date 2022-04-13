// add
export const createUserPost = async (entTitle, entContent) => {
    return await fetch("http://localhost:4000/userPost/add",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({entTitle, entContent})
        }
    ).then((res) => {
        return res.status === 201
    }).catch((err) => err);
}
