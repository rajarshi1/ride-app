const express = require("express")
const router = express.Router()
const controller=require('../../controllers/user_controllers/user.auth.controllers');
// const authJwt = require('../../middleware/verifySignedIn');

router.post('/sign-in', controller.SignIn);

router.post('/verify-otp', controller.VerifyOtp);

router.post('/resend-otp', controller.ResendOtp);

module.exports = router;