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
        return response.responseHelper(res, true, {location: `${protocol}://${hostUrl}/dev/api/${data.key}`}, "Document uploaded successful")
    })
})

router.get('/docs/:path', function(req, res, next) {
    const s = new AWS.S3({ params: { Bucket: process.env.AWS_BUCKET_NAME } })
    var imgStream = s.getObject({
        Bucket: 'comride-dev',
        Key: `documents/${req.params.path}`
    }).createReadStream();
    let myFile = req.params.path.split('.')
    const fileType = myFile[myFile.length - 1]
    console.log(fileType);
    if(fileType == 'pdf'){
        res.set('Content-Type', 'application/pdf');
    }else{
        res.set('Content-Type', 'image/'+fileType);
    }
    imgStream.pipe(res);
})

module.exports = router;