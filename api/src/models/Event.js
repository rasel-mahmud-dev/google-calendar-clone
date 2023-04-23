const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
	title: {type: String, required: true},
	users:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
	organizer: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	status: {type: String, enum: ["pending", "accepted", "proposedTime", "denied", "finished"]},
	start: {type: Date, required: true},
	end: {type: Date, required: true},
	meetingLink: {type: String, default: ""},
	eventColor: {type: String, default: ""},
	actionItems: {type: String, default: ""},
	agenda: {type: String, default: ""},
	followUp: {type: String, default: ""},
	attachments: [String],
	invitations: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
	
}, {timestamps: true})


module.exports = mongoose.model('Event', eventSchema)