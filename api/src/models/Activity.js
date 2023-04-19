const mongoose = require("mongoose")


const Activity = mongoose.model("Activity", new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	activityType: {
		type: String,
	},
	timeZone: {
		type: String,
		default: "est"
	},
	startDateTime: {
		type: Date,
		required: true
	},
	endDateTime: {
		type: Date,
		required: true
	},
	cycleInFuture: {
		type: Boolean,
		required: false
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	
	isAllDay: {
		type: Boolean,
		default: false
	},
	
	customTimeRepeat: {}
	
	
}, {timestamps: true}))


// let customTimeRepeat = {
//  turnOn: false
// 	repeatIteration: 3,
// 	repeatPeriod: 'week' // 'day' // 'month',
// 	repeatDays: [3, 5]
// }


module.exports = Activity