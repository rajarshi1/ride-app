const express = require("express")
const router = express.Router()
const controller = require('../../controllers/admin_controllers/admin.auth.controller');
const authJwt = require('../../middleware/admin_middleware/verifySignedin');

router.post('/login', controller.Login);

router.get('/view-users', controller.ViewUsers)

router.get('/view-drivers', controller.ViewDrivers)

router.get('/view-notapproved-drivers', controller.NotApprovedDrivers)

router.get('/view-notapproved-driver', controller.NotApprovedDriver)

module.exports = router;