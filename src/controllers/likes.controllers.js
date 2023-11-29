const db = require("../databases/database");
const { createHistory } = require("./historics.controllers");
const { isEmpty } = require("../services/varEmpty");

/**  {
        "user_id":"1"
    } */

module.exports.updateLikes = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  const likeQuery = "SELECT * FROM like_post WHERE post_id = ? AND user_id = ?";
  const insertQuery =
    "INSERT INTO like_post (post_id, user_id, choice) VALUES(?,?,?)";
  const deleteQuery = "DELETE FROM like_post WHERE post_id = ? AND user_id = ?";
  const getPostQuery = "SELECT like_number FROM posts WHERE id = ?";
  const updatePostQuery = "UPDATE posts SET like_number = ? WHERE id = ?";

  db.query(likeQuery, [id, user_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (isEmpty(result)) {
      db.query(insertQuery, [id, user_id, 1], (insertError, insertResult) => {
        if (insertError) {
          console.error(insertError);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        db.query(getPostQuery, id, (getPostError, getPostResult) => {
          if (getPostError) {
            console.error(getPostError);
            return res.status(500).json({ message: "Internal Server Error" });
          }

          db.query(
            updatePostQuery,
            [getPostResult[0].like_number + 1, id],
            (updatePostError, updatePostResult) => {
              if (updatePostError) {
                console.error(getPostError);
                return res
                  .status(500)
                  .json({ message: "Internal Server Error" });
              }
            }
          );
        });
        res
          .status(201)
          .json({ message: "Liked post successfully!", result: result });
      });
    } else {
      db.query(deleteQuery, [id, user_id], (deleteError, deleteResult) => {
        if (deleteError) {
          console.error(deleteError);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        db.query(getPostQuery, id, (getPostError, getPostResult) => {
          if (getPostError) {
            console.error(getPostError);
            return res.status(500).json({ message: "Internal Server Error" });
          }
          db.query(
            updatePostQuery,
            [getPostResult[0].like_number - 1, id],
            (updatePostError, updatePostResult) => {
              if (updatePostError) {
                console.error(getPostError);
                return res
                  .status(500)
                  .json({ message: "Internal Server Error" });
              }
            }
          );
        });
        res.status(201).json({ message: "Disliked post successfully!" });
      });
    }
  });
};
