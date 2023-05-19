
const express = require("express");
const {login, register, verifyAuth, getUsers, updateProfile} = require("../controllers/authController");
const auth = require("../middlewares/auth");


const router = express.Router()


router.post("/verify", verifyAuth)
router.post("/login", login)
router.post("/registration", register)
router.get("/users", getUsers)
router.post("/users/profile-update", auth, updateProfile)



module.exports = router