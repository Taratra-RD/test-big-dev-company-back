const router = require("express").Router();

const { updateLikes } = require("../controllers/likes.controllers");

router.post("/:id", updateLikes);

module.exports = router;
