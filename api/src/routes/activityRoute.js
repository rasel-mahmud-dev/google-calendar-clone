const express = require("express")

const {createActivity, getAllActivity, updateActivity, deleteActivity}  = require("../controllers/activityController");
const isAuth  = require("../middlewares/auth");


const router = express.Router()

router.get("/",  isAuth, getAllActivity)

router.post("/", isAuth, createActivity)

router.put("/", isAuth, updateActivity)

router.delete("/:activityId", isAuth, deleteActivity)


module.exports = router