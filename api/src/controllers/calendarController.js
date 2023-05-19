const Event = require('../models/Event')



// add meetingLinks and remove description
exports.createEvent = async (req, res) => {
	if (req.user?.parent) {
		return res.status(400).json({ error: "Access denied" })
	}
	const { title, start, end, agenda, notifications=[], actionItems, eventColor, meetingLink, followUp, attachments, invitations } = req.body
	if (!start) {
		return res.status(400).json({ error: "Start time is required" })
	}
	
	let data = {
		title,
		start,
		end,
		agenda,
		actionItems,
		notifications,
		eventColor,
		followUp,
		meetingLink,
		status: "pending",
		attachments,
		createdBy: req.user._id,
		invitations: invitations || []
	}
	
	let newEvent = new Event(data)
	newEvent.save()
		.then(async event => {

			console.log(event)

			res.json({event})


		})
		.catch(err => {
			console.log(err);
			res.status(400).json({ error: "Something went wrong" })
		})
}



// add meetingLinks and remove description
exports.updateEvent = async (req, res) => {
	if (req.user?.parent) {
		return res.status(400).json({ error: "Access denied" })
	}
	const { title, start, end, notifications, agenda, status, eventColor, meetingLink, attachments, invitations } = req.body
	
	if (!start) {
		return res.status(400).json({ error: "Start time is required" })
	}
	
	let data = {
		title,
		start,
		end,
		agenda,
		notifications,
		eventColor,
		meetingLink,
		status,
		attachments,
		invitations: invitations || []
	}

	try{
		await Event.findByIdAndUpdate(req.params.updateId, {
			$set: {
				...data
			}
		})
		res.json({event: data})

	} catch(ex){

		res.status(400).json({ error: "Something went wrong" })
	}
}


exports.getAllEvents = async (req, res)=>{
	try{

		let events = await Event.find({}).
		populate("createdBy", "firstName lastName email")
		.populate("invitations", "firstName lastName email avatar")
		res.send(events)

	}catch(ex){
		res.status(500).json({message: ex.message})
	}
}