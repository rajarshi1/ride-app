const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config')
const db = require('../../models');
const response = require('../../helpers/response.helper');
let { v4: uuidv4 } = require('uuid');
const User = db.users;
const OTP_User = db.otp_user;


function generateOtp(){
    return '1111'
}

exports.SignIn = async (req, res) => {
    const phone_no = req.body.phone_no;
    if (phone_no == "" || phone_no == null) {
        return response.responseHelper(res, true, "Field Required", "Phone number required");
    }
    try {
        let phnNumber = await User.findOne({
            where: {
                phone: phone_no,
            },
        })
        if (phnNumber) {
            var user = phnNumber;
        }
        else {
            user = await User.create({
                phone: phone_no
            })
        }
        if (!user) {
            return response.responseHelper(res, true, "Can't create user", "Somethis went wrong");
        } else {
            let token = uuidv4();
            let date = new Date();
            const data = {
                token,
                user_id: user.id,
            }

            let oldDateObj = new Date();
            let newDateObj = new Date();
            newDateObj.setTime(oldDateObj.getTime() + (15 * 60 * 1000));
            let otp = generateOtp();
            let otpToken = await OTP_User.create({
                user_id: user.id,
                otp: otp,
                otp_token: token,
                expiry_date: newDateObj,
            })
            // sendOtp(otp, user.phone_number);
            return response.responseHelper(res, true, data, "Otp sent successfully");
        }
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

exports.VerifyOtp = async (req, res) => {
    const token = req.body.token;
    const otp = req.body.otp;

    try {
        let otpVerify = await OTP_User.findOne({
            where: {
                otp_token: token,
                is_deleted: 0,
            }
        })
        if (!otpVerify) {
            return response.responseHelper(res, false, "OTP Token Expired", "Failed to verified otp")
        }
        else {
            if (new Date(otpVerify.expiry_date) < new Date()) {
                return response.responseHelper(res, false, "OTP Token Expired", "Failed to verified otp")
            }
            else if (otpVerify.otp != otp) {
                return response.responseHelper(res, false, "Invalid otp", "Failed to verified otp");
            }
            let user = await User.findOne({
                where: {
                    id: otpVerify.user_id,
                    is_deleted: 0,
                }
            })
            if (user) {
                await user.update({
                    otp_verified: 1,
                })
            }
            const token = jwt.sign(
                {
                    id: user.id,
                    phone: user.phone,
                },
                config.secret,
                {
                    expiresIn: 86400  // expiry time 1 day
                }
            );
            return response.responseHelper(res, true, {
                "user_id": user.id,
                "access-token": token
            }, "Login Success");
        }
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

exports.ResendOtp = async (req, res) => {
    let token = req.body.token;
    let date = new Date();
    if(token=="" || token==null){
        return response.responseHelper(res,true,"Field required","Invalid token passed");
    }
    try {
        let lastOtp= await  OTP_User.findOne({
            where:{
                otp_token:token,
                is_deleted:0
            }
        })
        if(!lastOtp){
            return response.responseHelper(res,true,"Invalid token","Wrong token");
        }
        new_token=uuidv4();
        const data = {
            "token":new_token,
            "user_id": lastOtp.user_id,
        }
        let oldDateObj = new Date();
        let newDateObj = new Date();
        newDateObj.setTime(oldDateObj.getTime() + (15 * 60 * 1000));
        let otp = generateOtp();
        await lastOtp.update({
            otp: otp,
            otp_token: new_token,
            expiry_date: newDateObj,
        })
        // sendOtp(otp, user.phone_number);
        return response.responseHelper(res, true, data, "Otp sent successfully");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res,false,"Error","Something went wrong");
    }
}