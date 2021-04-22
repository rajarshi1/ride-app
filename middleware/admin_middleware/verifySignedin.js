const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config');
const response = require('../../helpers/response.helper');
const db = require('../../models');

const Admin = db.admin;

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        response.responseHelper(res, false, 'No token provided!', 'Authentication failed');
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            response.responseHelper(res, false, 'Unauthorized!', 'Authentication failed');
        }
        req.adminId = decoded.id;
        // console.log(decoded);
        next();
    });
};

const verifyAdmin = async(req, res, next) => {
    try{
        const admin = await Admin.findOne({
            where: {
                id: req.adminId,
                is_deleted:0
            }
        });
        if(!admin) throw 'User not found';
        req.admin = admin;
        next();
    }catch(err){
        response.responseHelper(res, false, err, 'Authentication failed');
    }
}

const authJwt = {
    verifyToken,
    verifyAdmin
};
module.exports = authJwt;