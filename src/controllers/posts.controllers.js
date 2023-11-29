const db = require("../databases/database");
const { createHistory } = require("./historics.controllers");

/**  {
        "title":"New post",
        "content":"Just a post content, normally remplaced with lorem ipsum!",
        "user_id":"1"
    } */

module.exports.addPost = (req, res) => {
  const postQuery = "INSERT INTO posts SET ?";

  db.query(postQuery, req.body, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    createHistory(req.body.content);

    res.status(201).json({ message: "Post added successfully!" });
  });
};

module.exports.getPosts = (req, res) => {
  const postQuery =
    "SELECT A.*, B.username, C.user_id as user_likes FROM posts A INNER JOIN users B ON A.user_id=B.id LEFT JOIN like_post C ON A.id = C.post_id";

  db.query(postQuery, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res
      .status(200)
      .json({ message: "Posts retreived successfully!", result: result });
  });
};

module.exports.getPost = (req, res) => {
  const { id } = req.params;
  const postQuery =
    "SELECT A.*, B.username, C.user_id as user_likes FROM posts A INNER JOIN users B ON A.user_id=B.id LEFT JOIN like_post C ON A.id = C.post_id WHERE A.id = ?";

  db.query(postQuery, id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res
      .status(200)
      .json({ message: "One post retreived successfully!", result: result });
  });
};

module.exports.updatePost = (req, res) => {
  const { id } = req.params;
  const postQuery = "UPDATE posts SET title = ?, content = ? WHERE id = ?";

  db.query(postQuery, [req.body.title, req.body.content, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    createHistory(req.body.content);

    res
      .status(200)
      .json({ message: "One post updated successfully!", result: result });
  });
};
