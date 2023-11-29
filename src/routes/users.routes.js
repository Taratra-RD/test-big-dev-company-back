const router = require("express").Router()
const { signInUser, signUpUser } = require("../controllers/users.controllers")

router.post("/signin", signInUser)
router.post("/signup", signUpUser)


module.exports = router