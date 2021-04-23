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
        ])
        return response.responseHelper(res, true, "Success", "Added dummy data");
    }
    catch (err) {
        responseHelper(res, true, "Failed to create dummy data", 'Dummy Data created failed');
    }
})

module.exports = router;