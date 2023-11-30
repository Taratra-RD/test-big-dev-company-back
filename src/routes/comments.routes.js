const router = require("express").Router();

const {
  addComment,
  getComments,
  getComment,
  updateComment,
} = require("../controllers/comments.controllers");

router.post("/", addComment);
router.post("/get", getComments);
router.post("/get/:id", getComment);
router.put("/:id", updateComment);

module.exports = router;
