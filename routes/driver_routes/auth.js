const express = require("express");
const authConfig = require("../../config/auth.config");
const router = express.Router()
const controller = require('../../controllers/driver_controllers/driver.auth.controller');
const authJwt = require("../../middleware/driver_middleware/verifySignedIn");

router.post('/sign-in', controller.SignIn);

router.post('/verify-otp', controller.VerifyOtp);

router.post('/resend-otp', controller.ResendOtp);

router.post('/add-profile-details', [
    authJwt.verifyToken, authJwt.verifyDriver
    ], controller.ProfileInfo);

module.exports = router;
