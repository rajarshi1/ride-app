const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const response = require('../helpers/response.helper');
const db = require('../models');

const User = db.user;

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        response.responseHelper(res, false, 'No token provided!', 'Authentication failed');
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            response.responseHelper(res, false, 'Unauthorized!', 'Authentication failed');
        }
        req.userId = decoded.id;
        // console.log(decoded);
        next();
    });
};

const verifyUser = async(req, res, next) => {
    try{
        const user = await User.findOne({
            where: {
                id: req.userId,
                is_deleted:0
            }
        });
        if(!user) throw 'User not found';
        req.user = user;
        next();
    }catch(err){
        response.responseHelper(res, false, err, 'Authentication failed');
    }
}

const authJwt = {
    verifyToken,
    verifyUser
};
module.exports = authJwt;