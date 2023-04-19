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






router.get("/api/calender/myevent", auth, async function (req, res, next) {
	
	try {
		// let activities = await Activity.find({userId: req.userId})
		res.status(200).send({
			
			"success": true,
			"events": [{
				"users": [{
					"profilePicture": "",
					"lastName": "Operation",
					"_id": "61dde0f630eff48776f80ab1",
					"email": "ts4uoperation@gmail.com",
					"firstName": "TS4U",
					"fullName": "TS4U Operation"
				}],
				"description": "test",
				"actionItems": "",
				"followUp": "",
				"attachments": [],
				"invitations": [],
				"_id": "6405eedb7eb3a490c7e52e14",
				"title": "Test meeting",
				"start": "2023-03-06T13:50:00.000Z",
				"end": "2023-03-06T14:00:00.000Z",
				"status": "accepted",
				"createdBy": {
					"profilePicture": "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/1678719179750-IMG_20230303_11",
					"lastName": "Mahmud",
					"_id": "63ec68239ab9c66eeb874c47",
					"email": "rasel.mahmud@ts4u.us",
					"firstName": "Rasel ",
					"fullName": "Rasel  Mahmud"
				},
				"createdAt": "2023-03-06T13:47:07.586Z",
				"updatedAt": "2023-03-11T13:57:14.067Z",
				"__v": 0,
				"organizer": "63bce0d5bf24c0cdf31165a9"
			}],
			"myInvitations": []
			
		})
		
	} catch (ex) {
		console.log(ex)
	}
})


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