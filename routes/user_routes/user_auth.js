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

router.get('/fetch-user',[
    authJwt.verifyToken, authJwt.verifyUser
], controller.FetchUser);

router.post('/update-user',[
    authJwt.verifyToken, authJwt.verifyUser
], controller.ProfileUpdate);

router.get('/fetch-user-by-others/:userId',controller.FetchUserByOthers);

module.exports = router;

