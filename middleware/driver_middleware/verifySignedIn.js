const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config');
const response = require('../../helpers/response.helper');
const db = require('../../models');

const Driver = db.driver;

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        response.responseHelper(res, false, 'No token provided!', 'Authentication failed');
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            response.responseHelper(res, false, 'Unauthorized!', 'Authentication failed');
        }
        req.driverId = decoded.id;
        // console.log(decoded);
        next();
    });
};

const verifyDriver = async(req, res, next) => {
    try{
        const driver = await Driver.findOne({
            where: {
                id: req.driverId,
                is_deleted:0
            }
        });
        if(!driver) throw 'Driver not found';
        req.driver = driver;
        next();
    }catch(err){
        response.responseHelper(res, false, err, 'Authentication failed');
    }
}

const authJwt = {
    verifyToken,
    verifyDriver
};
module.exports = authJwt;