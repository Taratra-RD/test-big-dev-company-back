const router = require("express").Router()
const { addPost } = require("../controllers/posts.controllers")

router.post("/", addPost)

module.exports = router