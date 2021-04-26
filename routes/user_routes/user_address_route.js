const express = require("express")
const router = express.Router()
const controller = require('../../controllers/user_controllers/adderss.controller');
const authJwt = require('../../middleware/user_middleware/verifySignedIn');

router.post('/search-address', controller.SearchAddress);

router.post('/search-address-detail', controller.SearchAddressDetail);

router.post('/save-address',[
    authJwt.verifyToken,authJwt.verifyUser],
     controller.SaveAddress);

module.exports = router;

