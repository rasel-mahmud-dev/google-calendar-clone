const jwt = require("jsonwebtoken")
const User = require("../models/User");



exports.verifyAuth = async (req, res, next)=>{

     let token = req.headers["authorization"] || ""

    try{

         let data = jwt.decode(token, process.env.JWT_SECRET)
        if(!data){
            return res.status(409).json({message: "Please login first"})
        }

        let user = await User.findOne({_id: data.userId})
        if(!user){
            return res.status(409).json({message: "Please login first"})
        }

        user._doc["password"] = null

        res.status(201).json({
            ...user._doc,
            enrollment: {
                personalInformation: {
                    firstName: 'Rasel ',
                    lastName: 'Mahmud',
                    middleName: '',
                    otherName: '',
                    dob: '1998-12-31T00:00:00+06:00',
                    gender: 'male',
                    ssn: ''
                },
                instantContact: {
                    phone: '12082426371',
                    whatsApp: '12082426371',
                    outlook: '',
                    address1: 'Michigan',
                    address2: '',
                    city: 'Michigan',
                    state: 'Michigan',
                    zip: '41000'
                },
                secondaryContact: {
                    fullName: 'Rasel Mahmud',
                    address1: 'Michigan',
                    address2: '',
                    city: 'Michigan',
                    state: 'Michigan',
                    zip: '41000',
                    phone: '1 (208) 242-6371'
                },
                education: {
                    education: 'graduate',
                    majorProgram: 'CSE',
                    occupation: 'X',
                    companyName: '',
                    experience: '',
                    languageProficiency: 'fluent'
                },
                payment: {
                    method: 'cash',
                    bankName: '',
                    acountType: '',
                    acountNumber: '',
                    routingNumber: ''
                },
                additionalInfo: {
                    isVeteran: false,
                    isFelenoy: false,
                    hasDrivingLicense: false,
                    hasCreditCard: true,
                    hasDegree: true,
                    hasAssociateDegree: true,
                    isAuthorizeUSA: true,
                    hasCompunerKnowledge: true,
                    hasBasicInternetSkill: true,
                    hasEnglishWritingSkill: true,
                    hasSlack: true,
                    isJoinedSlack: true,
                    hasZoom: true,
                    isAvailableWorkshop: true,
                    isRefer: false
                },
                document: {
                    remark: '',
                    idCard: 'https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/enrollment/1676444732974-word-space-for-mobile.png',
                    signature: 'https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/enrollment/1676444751539-blob',
                    check: '',
                    otherDocument: ''
                },
                status: {
                    isActive: true
                },
                demo: {
                    isDemo: false
                },
                isApproved: true,
                _id: '63ec845b9ab9c66eeb878b2d',
                program: '61113628c4ea52404a295b03',
                session: '6264492f7f23aedc5c8d5d25',
                plan: '629b494c1baa9b64f985009d',
                email: 'rasel.mahmud@ts4u.us',
                totalAmount: 14999,
                user: '63ec68239ab9c66eeb874c47',
                createdAt: '2023-02-15T07:06:03.066Z',
                updatedAt: '2023-03-17T13:59:00.547Z',
                __v: 0,
                fullName: 'Rasel  Mahmud',
                id: '63ec845b9ab9c66eeb878b2d'
            }
        })

    } catch(ex){
        next(ex)
    }
}


exports.login = async (req, res, next)=>{

    const {email, password} = req.body

    try{
        let user = await User.findOne({email})
        if(!user){
            return next("This user not register yet.")
        }

        if(user.password !== password){
            return next("Sorry, Password doesn't match")
        }

        let token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
        user._doc["password"] = null

        res.status(201).json({
            token,
            ...user._doc
        })


    } catch(ex){
        next(ex)
    }
}


exports.register = async (req, res, next)=>{

    const {email, password, username} = req.body

    try{
        let user = await User.findOne({email})
        if(user){
            return next("This user already registered")
        }

        let newUser = new User({
            username,
            email,
            password
        })

        newUser = await newUser.save()
        if(!newUser){
            return next("User registration fail")
        }

        let token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
        newUser._doc["password"] = null

        res.status(201).json({
            token,
            ...newUser._doc
        })


    } catch(ex){
        next(ex)
    }
}