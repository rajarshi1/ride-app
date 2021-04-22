const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config')
const db = require('../../models');
const response = require('../../helpers/response.helper');
const Validator = require('validator');
const Admin = db.admin;

exports.Login = async(req,res) => {
    const username = req.body.username;
    //const email = req.body.email;
    const password = req.body.password;

    if (username === "" || username == null || password === "" || password == null) {
        return response.responseHelper(res, false, "Fill all the required fields", "Required fields cannot be empty");
    }

    let adminProfile = await Admin.findOne({
        where: {
            username: username,
            password: password,
            is_deleted: 0
        }
    })
    if (!adminProfile) {
        return response.responseHelper(res, true, "Admin not found", "Invalid credentials");
    }
    else{
        const token = jwt.sign(
            {
                id: adminProfile.id,
                username: adminProfile.username,
                email:adminProfile.email,
            },
            config.secret,
            {
                expiresIn: 86400  // expiry time 1 day
            }
        );
        return response.responseHelper(res, true, {
            "access-token":token
        }, "Login Success");
    }
}