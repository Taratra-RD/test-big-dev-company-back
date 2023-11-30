const db = require("../databases/database");
const { createHistory } = require("./historics.controllers");

/**  {
        "content":"Just a comment content, normally remplaced with lorem ipsum!",
        "post_id":"1"
    } */

module.exports.addComment = (req, res) => {
  const commentQuery = "INSERT INTO comments SET ?";

  db.query(commentQuery, req.body, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    createHistory(req.body.content);

    res.status(201).json({ message: "Comment added successfully!" });
  });
};

module.exports.getComments = (req, res) => {
  const commentQuery =
    "SELECT A.*, B.username FROM comments A INNER JOIN users B ON A.user_id = B.id WHERE A.post_id = ?";

  db.query(commentQuery, req.body.post_id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res
      .status(200)
      .json({ message: "comments retreived successfully!", result: result });
  });
};

module.exports.getComment = (req, res) => {
  const { id } = req.params;
  const commentQuery =
    "SELECT A.*, B.username FROM comments A INNER JOIN users B ON A.user_id = B.id WHERE A.post_id = ? AND A.id = ?";

  db.query(commentQuery, [req.body.post_id, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res
      .status(200)
      .json({ message: "One comment retreived successfully!", result: result });
  });
};

module.exports.updateComment = (req, res) => {
  const { id } = req.params;
  const commentQuery = "UPDATE comments SET content = ? WHERE id = ?";

  db.query(commentQuery, [req.body.content, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    createHistory(req.body.content);

    res
      .status(200)
      .json({ message: "One comment updated successfully!", result: result });
  });
};
