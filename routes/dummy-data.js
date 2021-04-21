const express = require('express');
const router = express.Router();

const db = require('../models/index');
const response = require("../helpers/response.helper");
router.post('/dummy-data',(req,res)=>{
    try{
        db.document_status.bulkCreate([
            {
                status:"Pending"
            },
            {
                status:"Accepted"
            },
            {
                status:"Rejected"
            },
        ])
        return response.responseHelper(res,true,"Success","Added dummy data");
    }
    catch (err) {
        responseHelper(res, true, "Failed to create dummy data", 'Dummy Data created failed');
    }
})

module.exports = router;