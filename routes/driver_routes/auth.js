const express = require("express")
const router = express.Router()

const controller = require("../controllers/auth.controller");
const authJwt = require('../middleware/verifySignedIn');

// router.post('/signup', controller.signup)

module.exports = router;