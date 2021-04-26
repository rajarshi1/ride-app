const express = require('express');
const router = express.Router();

const db = require('../models/index');
const response = require("../helpers/response.helper");
router.post('/dummy-data', (req, res) => {
    try {
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
        ]),

        db.banks.bulkCreate([
            { name: "Bank of Baroda" },
            { name: "Bank of India" },
            { name: "Bank of Maharashtra" },
            { name: "Canara Bank" },
            { name: "Central Bank of India" },
            { name: "Indian Bank" },
            { name: "Indian Overseas Bank" },
            { name: "Punjab and Sind Bank" },
            { name: "Punjab National Bank" },
            { name: "State Bank of India" },
            { name: "UCO Bank" },
            { name: "Union Bank of India" }
        ]),

        db.user_types.bulkCreate([
            {
                name:"Admin"
            },
            {
                name:"State Admin"
            },
            {
                name:"District Admin"
            },
        ]),

        db.districts.bulkCreate([
            { name: "Mysore" },
            { name: "Banglore" },
            { name: "Shivamogga" },
            { name: "Uttara Kannada" },
        ]),
        
        db.states.bulkCreate([
            { name: "Karnataka" },
            { name: "Bihar" },
            { name: "Gujrath" },
            { name: "Rajasthan" },
        ]),
        db.document_types.bulkCreate([
            { name: "ProfilePic" },
            { name: "Driving Licence" },
            { name: "Insurance"},
            { name: "Vehicle_RC" },
            { name: "Vehicle_Pic" },
            { name: "AddressProof" }
        ]),

        db.admin.create({
            name:"XYZ",
            username:"admin",
            email:"admin@firstfloor.agency",
            phone:"1231231234",
            user_type_id:1,
            district_id:1,
            state_id:1,
            password:"Pass@123",
        })
        return response.responseHelper(res, true, "Success", "Added dummy data");
    }
    catch (err) {
        responseHelper(res, true, "Failed to create dummy data", 'Dummy Data created failed');
    }
})

module.exports = router;