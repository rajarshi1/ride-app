const express = require("express")
const router = express.Router()
const controller = require('../../controllers/user_controllers/user.auth.controllers');
const authJwt = require('../../middleware/user_middleware/verifySignedIn');

router.post('/sign-in', controller.SignIn);

router.post('/verify-otp', controller.VerifyOtp);

router.post('/resend-otp', controller.ResendOtp);

router.post('/add-profile-details', [
    authJwt.verifyToken, authJwt.verifyUser
], controller.ProfileInfo);

router.post('/update-profile-pic', [
    authJwt.verifyToken, authJwt.verifyUser
], controller.SaveProfilePic);

module.exports = router;

