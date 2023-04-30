const express = require("express")

const auth = require("../middlewares/auth");
const {createEvent, getAllEvents, updateEvent} = require("../controllers/calendarController");


const router = express.Router()

router.get("/myevent", getAllEvents)
router.post("/create", createEvent)
router.put("/update/:updateId", updateEvent)


module.exports = router