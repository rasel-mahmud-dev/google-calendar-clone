const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	let token = req.headers["authorization"] || ""
	
	try {
		let data = jwt.decode(token, process.env.JWT_SECRET)
		if (!data) {
			return res.status(409).json({message: "Please login first"})
		}
		req.user = {
            _id: data.userId
        }
		next()
		
	} catch (ex) {
		return res.status(409).json({message: "Unauthorized"})
	}
}


module.exports = auth