const  cloudinary = require('cloudinary').v2
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

function uploadImage(filePath, fileName) {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await cloudinary.uploader.upload(filePath,  {use_filename: true, overwrite: true})
            resolve(result)
        } catch (ex) {
            resolve(null)
        }
    })
}
module.exports = uploadImage