const Activity = require("../models/Activity");

exports.getAllActivity = async function (req, res, next) {
	const {userId, activityType, perPage = 5, page = 1} = req.query
	
	try {
		
		let count = 0
		
		let activities = []
		if (userId && activityType) {
			
			let filter = {
				// userId: req.user._id,
				userId: userId,
				activityType: activityType,
				$or: [
					{
						startDateTime: {
							$gte: new Date()
						}
					},
					{
						endDateTime: {
							$gte: new Date()
						}
					},
					{
						cycleInFuture: true
					}
				]
			}
			
			// it can string or number
			if (page == 1) {
				count = await Activity.countDocuments(filter)
			}
			
			activities = await Activity.find(filter)
				.skip((Number(page) - 1) * Number(perPage))
				.limit(Number(perPage)).sort({"endDateTime": "desc", "startDateTime": "desc"})
			
		} else {
			count = await Activity.countDocuments({userId: req.user._id})
			activities = await Activity.find({
				userId: req.user._id,
			}).sort({"endDateTime": "desc", "startDateTime": "desc"})
		}
		
		res.status(200).send({data: activities, count: count})
		
	} catch (ex) {
		res.status(500).send({error: "Activity load fail"})
	}
}

exports.createActivity = async function (req, res, next) {
	const {
		startDateTime,
		endDateTime,
		title,
		description,
		activityType,
		customTimeRepeat = null,
		isAllDay = false,
		tz = "est"
	} = req.body
	
	
	if(!startDateTime){
		return res.status(409).json({ error: "Start time is required" })
	}
	if(!startDateTime){
		return res.status(409).json({ error: "End time is required" })
	}
	
	try {
		let newActivity = new Activity({
			title: title,
			description: description,
			startDateTime,
			endDateTime,
			activityType: activityType,
			userId: req.user._id,
			isAllDay,
			cycleInFuture: !!(customTimeRepeat && customTimeRepeat?.turnOn),
			customTimeRepeat,
			tz
		})
		
		newActivity = await newActivity.save()
		if (newActivity) {
			res.status(201).send(newActivity)
		}
		
	} catch (ex) {
		return res.status(500).json({ error: "Activity create fail" })
	}
}

exports.updateActivity = async function (req, res, next) {
	const {
		startDateTime,
		endDateTime,
		title,
		description,
		activityType,
		customTimeRepeat = null,
		isAllDay = false,
		tz = "est",
		_id
	} = req.body
	
	
	if(!startDateTime){
		return res.status(409).json({ error: "Start time is required" })
	}
	if(!startDateTime){
		return res.status(409).json({ error: "End time is required" })
	}
	
	try {
		
		let update = {
			title: title,
			description: description,
			startDateTime: startDateTime,
			endDateTime: endDateTime,
			activityType: activityType,
			userId: req.user._id,
			isAllDay,
			cycleInFuture: !!(customTimeRepeat && customTimeRepeat.turnOn),
			customTimeRepeat,
			tz
		}
		
		let result = await Activity.updateOne({_id: _id}, {$set: update}, {new: true})
		res.status(201).send({success: "ok"})
		
	} catch (ex) {
		return res.status(500).json({ error: "Activity update fail" })
	}
}

exports.deleteActivity = async function (req, res, next) {
	const {activityId} = req.params
	try {
		const result = await Activity.deleteOne({userId: req.user._id, _id: activityId})
		if (result.deletedCount) {
			res.status(201).send({success: "done"})
		} else {
			next("Activity delete fail")
		}
		
	} catch (ex) {
		return res.status(500).json({ error: "Activity delete fail" })
	}
}