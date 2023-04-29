
const express = require("express");
const {login, register, verifyAuth, getUsers} = require("../controllers/authController");


const router = express.Router()


router.post("/verify", verifyAuth)
router.post("/login", login)
router.post("/registration", register)
router.get("/users", getUsers)


module.exports = router