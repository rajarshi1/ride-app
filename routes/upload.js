const express = require("express")
const router = express.Router()
const response = require('../helpers/response.helper')


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

router.post('/image-upload', singleUpload, (req, res) => {
    let file = req.file;
    let myFile = file.originalname.split('.')
    const fileType = myFile[myFile.length - 1]
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME + "/images",
        Key: `${uuidv4()}.${fileType}`,
        Body: req.file.buffer
    }

    const hostUrl = req.get('host');
    const protocol = req.protocol;
    
    const mimeSupported = ['png','jpeg','jpg', 'gif', 'pdf'];
    
    if(!mimeSupported.includes(fileType) ){
        return response.responseHelper(res, false, "Failed to upload image", "Image type not supported");
    }

    s3.upload(params, (error, data) => {
        if (error) {
            console.log(error);
            return response.responseHelper(res, false, "Failed to upload image", "Image failed to upload")
        }
        return response.responseHelper(res, true, {location: `${protocol}://${hostUrl}/dev/api/account/${data.key}`}, "Image uploaded successful")
    })
})

router.get('/images/:path', function(req, res, next) {
    const s = new AWS.S3({ params: { Bucket: process.env.AWS_BUCKET_NAME } })
    var imgStream = s.getObject({
        Bucket: 'home-chef-dev',
        Key: `images/${req.params.path}`
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