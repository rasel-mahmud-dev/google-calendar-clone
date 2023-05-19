const jwt = require("jsonwebtoken")


exports.generateToken = (userId, email, role, permission) => {
    let token = jwt.sign({
            _id: userId,
            email: email,
            role: role,
            permission: permission
        },
        process.env.JWT_SECRET, {expiresIn: '7d'}
    );
    return token
}


exports.parseToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                reject(error)
            }
            resolve(decoded)
        });
    })
}