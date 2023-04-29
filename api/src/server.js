const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const  mongoose = require("mongoose")

require("dotenv").config({})
const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

const routes = require("./routes");
app.use(routes)


app.get("/", (req, res)=>{
	res.send("hi")
})


app.use((err, req, res, next)=>{
	let status = err?.status || 500
	let message = "Internal Error"
	if(typeof err === "string"){
		message = err
	} else if(err.message && typeof err.message === "string"){
		message = err.message
	}
	res.status(status).json({
		message: message
	})
})


mongoose.connect(process.env.MONGODB_URL).then(()=>{
	console.log("mongodb connected")
}).catch((ex)=>{
	console.log(ex)
	console.log("mongodb connection fail")
})


module.exports = app

module.exports  = app

