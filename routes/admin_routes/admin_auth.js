const express = require("express")
const router = express.Router()
const controller = require('../../controllers/admin_controllers/admin.auth.controller');
const authJwt = require('../../middleware/admin_middleware/verifySignedin');

router.post('/login', controller.Login);

module.exports = router;