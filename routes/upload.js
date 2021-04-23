const express = require("express")
const router = express.Router()
const response = require('../helpers/response.helper');

require('dotenv/config')
const multer = require('multer')
const AWS = require('aws-sdk')
const {v4: uuidv4} = require('uuid')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: (req, res, callback) => {
        callback(null, '')
    }
})

const singleUpload = multer({storage}).single('image')

router.post('/docs-upload', singleUpload, (req, res) => {
    let file = req.file;
    let myFile = file.originalname.split('.')
    const fileType = myFile[myFile.length - 1]
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME + "/documents",
        Key: `${uuidv4()}.${fileType}`,
        Body: req.file.buffer
    }

    const hostUrl = req.get('host');
    const protocol = req.protocol;
    
    const mimeSupported = ['png','jpeg','jpg', 'gif', 'pdf'];
    
    if(!mimeSupported.includes(fileType) ){
        return response.responseHelper(res, false, "Failed to upload document", "Document type not supported");
    }

    s3.upload(params, (error, data) => {
        if (error) {
            console.log(error);
            return response.responseHelper(res, false, "Failed to upload document", "Document failed to upload")
        }
        return response.responseHelper(res, true, {location: `https://comride-dev.s3.ap-south-1.amazonaws.com/documents/${data.key}`}, "Document uploaded successful")
    })
})

module.exports = router;