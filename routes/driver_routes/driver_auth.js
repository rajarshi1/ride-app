const express = require("express");
const authConfig = require("../../config/auth.config");
const router = express.Router()
const controller = require('../../controllers/driver_controllers/driver.auth.controller');
const authJwt = require('../../middleware/driver_middleware/verifySignedIn');

router.post('/sign-in', controller.SignIn);

router.post('/verify-otp', controller.VerifyOtp);

router.post('/resend-otp', controller.ResendOtp);

router.post('/add-profile-details', [
    authJwt.verifyToken, authJwt.verifyDriver
], controller.ProfileInfo);

router.post('/save-profile-pic', [
    authJwt.verifyToken, authJwt.verifyDriver
], controller.SaveProfilePic);

router.post('/save-driving-licence', [
    authJwt.verifyToken, authJwt.verifyDriver
], controller.SaveDrivingLicence);

router.post('/save-address-proof', [
    authJwt.verifyToken, authJwt.verifyDriver
], controller.SaveAddressProof);

module.exports = router;