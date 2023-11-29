const router = require("express").Router();

const {
  addComment,
  getComments,
  getComment,
  updateComment,
} = require("../controllers/comments.controllers");

router.post("/", addComment);
router.get("/", getComments);
router.get("/:id", getComment);
router.put("/:id", updateComment);

module.exports = router;
