
const uploadImage = require("../services/uploadImage");
const yup = require("yup")
const {formidable} = require("formidable")
const mime = require("mime-types")

const jwt = require("jsonwebtoken")
const User = require("../models/User");
const {generateToken} = require("../services/jwt");

const parseJSON = require("../utils/parseJSON")

exports.getUsers = async (req, res, next) => {
    try {

        let users = await User.find({})
        res.status(200).json(users)

    } catch (ex) {
        next(ex)
    }
}

exports.verifyAuth = async (req, res, next) => {

    let token = req.headers["authorization"] || ""

    try {
        let data = jwt.decode(token, process.env.JWT_SECRET)

        if (!data) {
            return res.status(409).json({message: "Please login first"})
        }

        let user = await User.findOne({_id: data._id})

        if (!user) {
            return res.status(409).json({message: "Please login first"})
        }

        user._doc["password"] = null

        res.status(201).json({
            ...user._doc,
        })

    } catch (ex) {
        next(ex)
    }
}


exports.login = async (req, res, next) => {

    const {email, password} = req.body

    try {
        let user = await User.findOne({email})
        if (!user) {
            return next("This user not register yet.")
        }

        if (user.password !== password) {
            return next("Sorry, Password doesn't match")
        }

        let token = generateToken(user._id, user.email, "USER")
        user._doc["password"] = null

        res.status(201).json({
            token,
            ...user._doc
        })


    } catch (ex) {
        next(ex)
    }
}


exports.register = async (req, res, next) => {

    let formData = formidable({})


    formData.parse(req, async function (err, fields, files) {
        if (err) {
            return next(err)
        }


        try {

            const {firstName, lastName = "", email, password} = fields


            let user = await User.findOne({email})
            if (user) {
                return next("This user already registered")
            }


            const schema = yup.object({
                firstName: yup.string().required("First Name required").max(100).label("FirstName"),
                lastName: yup.string().max(100).label("LastName"),
                email: yup.string().email().required("email required").max(100).label("Email"),
                password: yup.string().required("password required").max(100).label("Password"),
            })


            await schema.validate(fields)


            let payload = {firstName, lastName, email, password}

            if (files) {
                let userAvatar = files["avatar"]
                if (userAvatar) {
                    let ext = mime.extension(userAvatar.mimetype)
                    let fileName = userAvatar.originalFilename + "." + ext;
                    let uploadInfo = await uploadImage(userAvatar.filepath, fileName)
                    if (uploadInfo && uploadInfo.secure_url) {
                        payload["avatar"] = uploadInfo.secure_url
                    }
                }
            }


            let newUser = new User({...payload})

            newUser = await newUser.save()
            if (!newUser) {
                return next("User registration fail")
            }

            let token = generateToken(newUser._id, newUser.email, "USER")
            newUser._doc["password"] = null

            res.status(201).json({
                token,
                ...newUser._doc
            })

        } catch (ex) {
            return next(ex)
        }

    })


}


exports.updateProfile = async (req, res, next) => {

    let formData = formidable({})

    try {

        formData.parse(req, async function (err, fields, files) {
            if (err) {
                return next(err)
            }

            try {
                let schema = yup.object({
                    firstName: yup.string().max(100),
                    lastName: yup.string().max(50),
                    _id: yup.string().required("Please provide user id to update profile")
                })

                await schema.validate(fields)

                const {firstName, lastName, _id, permission} = fields
                const payload = {}

                if (firstName) payload["firstName"] = firstName
                if (lastName) payload["lastName"] = lastName
                if (permission) {
                    let p = await parseJSON(permission)
                    if (p) {
                        payload["permission"] = p
                    }
                }

                if (files) {
                    let userAvatar = files["avatar"]
                    if (userAvatar) {
                        let ext = mime.extension(userAvatar.mimetype)
                        let fileName = userAvatar.originalFilename + "." + ext;
                        let uploadInfo = await uploadImage(userAvatar.filepath, fileName)
                        if (uploadInfo && uploadInfo.secure_url) {
                            payload.avatar = uploadInfo.secure_url
                        }
                    }
                }


                let isRegistered = await User.exists({_id})
                if (!isRegistered) return next({"message": "User not found"})


                let result = await User.findByIdAndUpdate(
                    {_id},
                    {$set: payload},
                )

                res.status(201).json({data: payload, message: "Profile updated"})


            } catch (ex) {
                return next(ex)
            }


        })

        // const users = await User.findOne({}, {projection: {password: 0}})
        //
        // // send response to client
        // res.status(200).json(users)
    } catch (ex) {
        next(ex)
    }

}
