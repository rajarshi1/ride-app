const express = require('express');
const router = express.Router();

const db = require('../models/index');
const response = require("../helpers/response.helper");
router.post('/dummy-data', (req, res) => {
    try {
        // db.document_status.bulkCreate([
        //     {
        //         status: "Pending"
        //     },
        //     {
        //         status: "Accepted"
        //     },
        //     {
        //         status: "Rejected"
        //     },
        // ]),

        //     db.banks.bulkCreate([
        //         { name: "Bank of Baroda" },
        //         { name: "Bank of India" },
        //         { name: "Bank of Maharashtra" },
        //         { name: "Canara Bank" },
        //         { name: "Central Bank of India" },
        //         { name: "Indian Bank" },
        //         { name: "Indian Overseas Bank" },
        //         { name: "Punjab and Sind Bank" },
        //         { name: "Punjab National Bank" },
        //         { name: "State Bank of India" },
        //         { name: "UCO Bank" },
        //         { name: "Union Bank of India" }
        //     ]),

        //     db.user_types.bulkCreate([
        //         {
        //             name: "Admin"
        //         },
        //         {
        //             name: "State Admin"
        //         },
        //         {
        //             name: "District Admin"
        //         },
        //     ]),

        //     db.districts.bulkCreate([
        //         { name: "Mysore" },
        //         { name: "Banglore" },
        //         { name: "Shivamogga" },
        //         { name: "Uttara Kannada" },
        //     ]),

        //     db.states.bulkCreate([
        //         { name: "Karnataka" },
        //         { name: "Bihar" },
        //         { name: "Gujrath" },
        //         { name: "Rajasthan" },
        //     ]),
        //     db.document_types.bulkCreate([
        //         { name: "ProfilePic" },
        //         { name: "Driving Licence" },
        //         { name: "Insurance" },
        //         { name: "Vehicle_RC" },
        //         { name: "Vehicle_Pic" },
        //         { name: "AddressProof" }
        //     ]),

        //     db.admin.create({
        //         name: "XYZ",
        //         username: "admin",
        //         email: "admin@firstfloor.agency",
        //         phone: "1231231234",
        //         user_type_id: 1,
        //         district_id: 1,
        //         state_id: 1,
        //         password: "Pass@123",
        //     }),
            db.user_permissions.bulkCreate([
                {
                    user_type_id: 1,
                    document_type_id: 1,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted: 0,
                },
                {
                    user_type_id: 1,
                    document_type_id: 2,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted: 0,
                },
                {
                    user_type_id: 1,
                    document_type_id: 3,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted:01,
                },
                {
                    user_type_id: 1,
                    document_type_id: 4,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted: 0,
                },
                {
                    user_type_id: 1,
                    document_type_id: 5,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted:0,
                },
                {
                    user_type_id: 1,
                    document_type_id: 6,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted:0,
                },
                {
                    user_type_id: 2,
                    document_type_id: 1,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted: 1,
                },
                {
                    user_type_id: 2,
                    document_type_id: 2,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted: 1,
                },
                {
                    user_type_id: 2,
                    document_type_id: 3,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted: 1,
                },
                {
                    user_type_id: 2,
                    document_type_id: 4,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted: 1,
                },
                {
                    user_type_id: 2,
                    document_type_id: 5,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted: 1,
                },
                {
                    user_type_id: 2,
                    document_type_id: 6,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 0,
                    state_restricted: 1,
                },
                {
                    user_type_id: 3,
                    document_type_id: 1,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 1,
                    state_restricted: 1,
                },
                {
                    user_type_id: 3,
                    document_type_id: 2,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 1,
                    state_restricted: 1,
                },
                {
                    user_type_id: 3,
                    document_type_id: 3,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 1,
                    state_restricted: 1,
                },
                {
                    user_type_id: 3,
                    document_type_id: 4,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 1,
                    state_restricted: 1,
                },
                {
                    user_type_id: 3,
                    document_type_id: 5,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 1,
                    state_restricted: 1,
                },
                {
                    user_type_id: 3,
                    document_type_id: 6,
                    read: 1,
                    write: 1,
                    distcrict_restricted: 1,
                    state_restricted: 1,
                },
            ])
        return response.responseHelper(res, true, "Success", "Added dummy data");
    }
    catch (err) {
        responseHelper(res, true, "Failed to create dummy data", 'Dummy Data created failed');
    }
})

module.exports = router;