const router = require("express").Router();
const {
  addPost,
  getPosts,
  getPost,
  updatePost,
} = require("../controllers/posts.controllers");

router.post("/", addPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);

module.exports = router;
