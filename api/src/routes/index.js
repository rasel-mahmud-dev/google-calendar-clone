const express = require("express");
const auth = require("../middlewares/auth");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");



const calendarRoute  = require("../routes/calendarRoute")
const activityRoute  = require("../routes/activityRoute")
const authRoute  = require("../routes/authRoute")

const router = express.Router()


router.use("/api/calendar", calendarRoute)
router.use("/api/activities", activityRoute)
router.use("/api/auth", authRoute)



router.post("/api/calender/filter-user", auth, async function (req, res, next) {
	
	const {query} = req.body
	
	try {
		let users = await User.find({
			$or: [
				{username: {$regex: new RegExp(query, "g")}},
				{email: {$regex: new RegExp(query, "g")}}
			]
		})
		if (!users) {
			return res.status(404).send("Something were wrong.")
		}
		
		res.status(200).send({
			success: true,
			users: users.map(user => ({
				...user._doc,
				firstName: user._doc.username,
				lastName: user._doc.username,
				fullName: user._doc.username,
				profilePicture: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
			}))
		})
		
	} catch (ex) {
		console.log(ex)
		return res.status(404).send("Something were wrong.")
	}
	
})


module.exports = router