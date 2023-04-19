
const express = require("express");
const {login, register, verifyAuth} = require("../controllers/authController");


const router = express.Router()


router.post("/verify", verifyAuth)
router.post("/login", login)
router.post("/registration", register)


module.exports = router