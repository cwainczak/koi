const User = require("../User")

/**
 * Receives request at endpoint "/user/getUserObj"
 * @param req -> The GET request consisting of a UserID
 * @param res -> The GET response containing the corresponding User JSON
 */
exports.getUserObj = async (req, res) => {
    const result = await User.getUserFromID(req.query.UserID)
    if (result === -1) res.status(500).send()
    res.status(200).send(result)
}
