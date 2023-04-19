const express = require("express")

const auth = require("../middlewares/auth");
const {createEvent, getAllEvents} = require("../controllers/calendarController");


const router = express.Router()

router.get("/events", getAllEvents)
router.post("/create", createEvent)


module.exports = router