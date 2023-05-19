const express = require("express")

const auth = require("../middlewares/auth");
const {createEvent, getAllEvents, updateEvent} = require("../controllers/calendarController");


const router = express.Router()

router.get("/events", getAllEvents)
router.post("/create", auth, createEvent)
router.put("/update/:updateId", auth, updateEvent)


module.exports = router