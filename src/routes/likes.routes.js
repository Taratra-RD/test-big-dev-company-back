const router = require("express").Router();

const { updateLikes, getLike } = require("../controllers/likes.controllers");

router.post("/:id", updateLikes).post("/get/:id", getLike);

module.exports = router;
