const db = require("../databases/database")
const { createHistory } = require("./historics.controllers")

module.exports.addPost = (req, res) => {
    const postQuery = "INSERT INTO posts SET ?"

    db.query(postQuery, req.body, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" })
        }
        createHistory(req.body.content)

        res.status(201).json({ message: "Post added successfully!" })

    })
}