const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config')
const db = require('../../models');
const response = require('../../helpers/response.helper');
let { v4: uuidv4 } = require('uuid');
const Validator = require('validator');
const User = db.users;
const OTP_User = db.otp_user;
const {Op} = require('sequelize');
const UserReferrals=db.user_referrals;

function generateOtp(){
    return '1111'
}

exports.SignIn = async (req, res) => {
    const country_code = req.body.country_code
    const phone_no = req.body.phone_no;
    const phoneno = /^\d{10}$/;
    if (phone_no == "" || phone_no == null || country_code == "" || country_code == null  ) {
        return response.responseHelper(res, false, "Field Required", "All fields required");
    }
    else if(phone_no.toString().length!=10 || !phone_no.match(phoneno)){
        return response.responseHelper(res, false, "Invalid phone number", "Enter valid 10 digit mobile number");
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
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var refCode = '';
            var length = 6;
            for (var i = length; i > 0; --i) refCode += chars[Math.floor(Math.random() * chars.length)];
            user = await User.create({
                phone: phone_no,
                country_code: country_code,
                referral_code: refCode
            })
        }
        if (!user) {
            return response.responseHelper(res, true, "Can't create user", "Somethis went wrong");
        } else {
            let token = uuidv4();
            let date = new Date();
            const data = {
                token
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
            //return response.responseHelper(res, false, Error, "Otp could not be sent");
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
                is_used:0,
                is_deleted: 0,
            }
        })
        console.log(otpVerify);
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
            await otpVerify.update({
                is_used:1
            })
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
    if (token == "" || token == null) {
        return response.responseHelper(res, false, "Field required", "Invalid token passed");
    }
    try {
        let lastOtp = await OTP_User.findOne({
            where: {
                otp_token: token,
                is_deleted: 0
            }
        })
        if (!lastOtp) {
            return response.responseHelper(res, false, "Invalid token", "Wrong token");
        }
        let dateNow = new Date().toISOString().split('T')[0];
        let time = new Date().toISOString().split('T')[1];
        time = time.split('.')[0];
        dateNow = dateNow + ' ' + time;

        let timeLimit = new Date(lastOtp.createdAt);
        console.log(timeLimit.getTime());
        timeLimit = new Date(timeLimit.getTime() + (10 * 60 * 1000)).toUTCString();
        console.log(timeLimit);

        let otpResentTimes = await OTP_User.count({
            where: {
                user_id: lastOtp.user_id,
                createdAt: {
                    [Op.between]: [lastOtp.createdAt, timeLimit]
                }
            }
        })
        console.log(otpResentTimes);
        if (otpResentTimes <= 5) {
            new_token = uuidv4();
            const data = {
                "token": new_token,
            }
            let oldDateObj = new Date();
            let newDateObj = new Date();
            newDateObj.setTime(oldDateObj.getTime() + (15 * 60 * 1000));
            let otp = generateOtp();
            await OTP_User.create({
                user_id: lastOtp.user_id,
                otp: otp,
                otp_token: new_token,
                expiry_date: newDateObj,
            })
            // sendOtp(otp, user.phone_number);
            return response.responseHelper(res, true, data, "Otp resent successfully");
        }
        return response.responseHelper(res, false, "You have requested for otp enough times", "wait for some time to request again");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

exports.ProfileInfo = async (req, res) => {
    const user_id = req.userId;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const DOB = req.body.dob;
    const gender = req.body.gender;
    const referral_code = req.body.referral_code;

    if (firstname === "" || firstname == null || lastname === "" || lastname == null || email === "" || email == null || DOB === "" || DOB == null ||
        gender === "" || gender == null) {
        return response.responseHelper(res, false, "Fill all the required fields", "Required fields cannot be empty");
    }
    else if (!Validator.isEmail(email)) {
        return response.responseHelper(res, false, "Invalid email", "email format inavlid");
    }
    try {
        let emailExist = await User.findOne({
            where: {
                email: email,
                is_deleted: 0
            }
        })
        if (emailExist) {
            return response.responseHelper(res, false, "Email already exists", "Use different one");
        }
        let userProfile = await User.findOne({
            where: {
                id: user_id,
                is_deleted: 0
            }
        })
        if (!userProfile) {
            return response.responseHelper(res, false, "User not found", "Invalid id");
        }
        var refferedBy=null;
        if(referral_code){
            var isValidCode= await User.findOne({
                where:{
                    referral_code:referral_code,
                    id:{
                       [Op.ne]:[user_id] 
                    }
                }
            })
            if(!isValidCode){
                return response.responseHelper(res, false, "Invalid Code", "Referral code not found");
            }
            var referral=await UserReferrals.create({
                referred_by:isValidCode.id,
                referred_to:user_id,
                referral_code:referral_code,
            })
            refferedBy=referral.id;
        }
        let addProfile = await userProfile.update({
            first_name: firstname,
            last_name: lastname,
            email: email,
            DOB:DOB,
            gender:gender,
            isProfileUpdated:1,
        })
        let result = {
            firstname: addProfile.first_name,
            lastname: addProfile.last_name,
            email: addProfile.email,
            DOB: addProfile.DOB,
            gender: addProfile.gender,
            referral_code: (addProfile.referral_code==null)?'':addProfile.referral_code,
        }

        if(!addProfile){
            return response.responseHelper(res,false,"Can't update profile","Something is wrong");
        }
        return response.responseHelper(res,true,result,"Details are successfully added");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

exports.SaveProfilePic= async (req,res) =>{
    const user_id= req.userId;
    const profile_pic=req.body.profile_pic_url;

    if(profile_pic==="" || profile_pic == null){
        return response.responseHelper(res,false,"Enter valid url","invalid url passed");
    }
    try {
        let user=await User.findOne({
            where:{
                id:user_id,
                is_deleted:0,
            }
        })
        if(!user){
            return response.responseHelper(res, false, "User not found","Invalid user id");
        }
        let profilePic=await user.update({
            profile_pic:profile_pic,
        })
        if(!profilePic){
            return response.responseHelper(res, false, "Can't update profile pic", "Something is wrong");
        }
        return response.responseHelper(res,true,profilePic,"Successfully saved");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

exports.FetchUser = async(req,res) =>{
    const user_id=req.userId;
    try {
        let user=await User.findOne({
            where:{
                id:user_id,
                is_deleted:0,
            },
            attributes:['first_name','last_name','phone']
        })
        if(!user){
            return response.responseHelper(res, false, "User not found","Invalid user id");
        } 
        return response.responseHelper(res, true, user,"success");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong"); 
    }
}

exports.FetchUserByOthers = async(req,res) =>{
    const user_id=req.params.userId;
    try {
        let user=await User.findOne({
            where:{
                id:user_id,
                is_deleted:0,
            },
            attributes:['first_name','rating','phone']
             
        })
        if(!user){
            return response.responseHelper(res, false, "User not found","Invalid user id");
        } 
        return response.responseHelper(res, true, user,"success");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong"); 
    }
}

exports.ProfileUpdate = async (req, res) => {
    const user_id = req.userId;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const DOB = req.body.dob;
    const gender = req.body.gender;

    if (firstname === "" || firstname == null || lastname === "" || lastname == null || email === "" || email == null || DOB === "" || DOB == null ||
        gender === "" || gender == null) {
        return response.responseHelper(res, false, "Fill all the required fields", "Required fields cannot be empty");
    }
    else if (!Validator.isEmail(email)) {
        return response.responseHelper(res, true, "Invalid email", "email format inavlid");
    }
    try {
        let userProfile = await User.findOne({
            where: {
                id: user_id,
                is_deleted: 0
            }
        })
        if (!userProfile) {
            return response.responseHelper(res, true, "User not found", "Invalid id");
        }
        if(email!==userProfile.email){
            let emailExist = await User.findOne({
                where: {
                    email: email,
                    is_deleted: 0
                }
            })
            if (emailExist) {
                return response.responseHelper(res, true, "Email already exists", "Use different one");
            }
        }
        let addProfile = await userProfile.update({
            first_name: firstname,
            last_name: lastname,
            email: email,
            DOB:DOB,
            gender:gender,
        })
        let result = {
            firstname: addProfile.first_name,
            lastname: addProfile.last_name,
            email: addProfile.email,
            DOB: addProfile.DOB,
            gender: addProfile.gender,
        }

        if(!addProfile){
            return response.responseHelper(res,false,"Can't update profile","Something is wrong");
        }
        return response.responseHelper(res,true,result,"Details are successfully added");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}