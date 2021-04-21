const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config')
const db = require('../../models');
const response = require('../../helpers/response.helper');
let { v4: uuidv4 } = require('uuid');
const { users, otp_driver, driver } = require('../../models');
const Validator = require('validator');
const Drivers = db.driver;
const OTP_Driver = db.otp_driver;
const DriverDocs = db.driver_documents;
const DocStatus = db.document_status;
const AddressProof = db.address_proof;
const DrivingLicence = db.driving_licence;
const Insurance = db.insurance;
const ProfilePic = db.profile_pic;
const VehiclePic = db.vehicle_pic;

generateOtp = () => {
    // const OTP = Math.floor(Math.random() * 900000) + 10000;
    // return OTP;
    return '1111';
}

// sendOtp = (otp, phone_number) => {
//     const nexmo = new Nexmo({
//         apiKey: 'f0f7b9b6',
//         apiSecret: '2TF1QfhSJwOPGSXL',
//     });
//     const from = 'HomeChef-Dev';
//     //const to = '+44'+'7548864629';
//     const to = '+91' + phone_number;
//     const text = 'Your otp is : ' + otp;

//     console.log(from, to, text);

//     try {
//         // nexmo.message.sendSms(from, to, text);
//     } catch (error) {
//         console.log(error);
//     }

// }

exports.SignIn = async (req, res) => {
    const phone_no = req.body.phone_no;
    console.log(req.body);
    if (phone_no == "" || phone_no == null) {
        return response.responseHelper(res, true, "Field Required", "Phone number required");
    }
    try {
        let phnNumber = await Drivers.findOne({
            where: {
                phone: phone_no,
            },
        })
        if (phnNumber) {
            var driver = phnNumber;
        }
        else {
            driver = await Drivers.create({
                phone: phone_no
            })
        }
        if (!driver) {
            return response.responseHelper(res, true, "Can't create user", "Somethis went wrong");
        } else {
            let token = uuidv4();
            let date = new Date();
            const data = {
                token,
                driver_id: driver.id,
            }

            let oldDateObj = new Date();
            let newDateObj = new Date();
            newDateObj.setTime(oldDateObj.getTime() + (15 * 60 * 1000));
            let otp = generateOtp();
            let otpToken = await OTP_Driver.create({
                driver_id: driver.id,
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
        let otpVerify = await OTP_Driver.findOne({
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
            let driver = await Drivers.findOne({
                where: {
                    id: otpVerify.driver_id,
                    is_deleted: 0,
                }
            })
            if (driver) {
                await driver.update({
                    otp_verified: 1,
                })
            }
            const token = jwt.sign(
                {
                    id: driver.id,
                    phone: driver.phone,
                },
                config.secret,
                {
                    expiresIn: 86400  // expiry time 1 day
                }
            );
            return response.responseHelper(res, true, {
                "driver_id": driver.id,
                "access-token": token,
                "profile_details_added":driver.isProfileUpdated,
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
        return response.responseHelper(res, true, "Field required", "Invalid token passed");
    }
    try {
        let lastOtp = await OTP_Driver.findOne({
            where: {
                otp_token: token,
                is_deleted: 0
            }
        })
        if (!lastOtp) {
            return response.responseHelper(res, true, "Invalid token", "Wrong token");
        }
        new_token = uuidv4();
        const data = {
            "token": new_token,
            "driver_id": lastOtp.driver_id,
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
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

exports.ProfileInfo = async (req, res) => {
    const driver_id = req.driverId;
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
        return response.responseHelper(res, true, "Invalid email", "email format inavlid");
    }
    try {
        let emailExist = await Drivers.findOne({
            where: {
                email: email,
                is_deleted: 0
            }
        })
        if (emailExist) {
            return response.responseHelper(res, true, "Email already exists", "Use different one");
        }
        let driverProfile = await Drivers.findOne({
            where: {
                id: driver_id,
                is_deleted: 0
            }
        })
        if (!driverProfile) {
            return response.responseHelper(res, true, "Driver not found", "Invalid id");
        }
        let addProfile = await driverProfile.update({
            first_name: firstname,
            last_name: lastname,
            email: email,
            DOB:DOB,
            gender:gender,
            isProfileUpdated:1,
        })
        if(!addProfile){
            return response.responseHelper(res,false,"Can't update profile","Something is wrong");
        }
        return response.responseHelper(res,true,addProfile,"Details are successfully added");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

exports.SaveProfilePic= async (req,res) =>{
    const driver_id= req.driverId;
    const profile_pic=req.body.profile_pic_url;

    if(profile_pic==="" || profile_pic == null){
        return response.responseHelper(res,false,"Enter valid url","invalid url passed");
    }
    try {
        let profilePic=await ProfilePic.create({
            driver_id:driver_id,
            profile_pic:profile_pic,
        })
        if(!profilePic){
            return response.responseHelper(res, false, "Can't create profile pic", "Something is wrong");
        }
        return response.responseHelper(res,true,profilePic,"Successfully saved");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

exports.SaveDrivingLicence= async (req,res)=>{
    const driver_id=req.driverId;
    const dl_no=req.body.dl_no;
    const dl_front=req.body.dl_front;
    const dl_back=req.body.dl_back;

    if(dl_no==="" || dl_no == null || dl_front==="" || dl_front== null || dl_back === "" || dl_back == null){
        return response.responseHelper(res,false,"Enter valid data","Invalid data passed");
    }
    try {
        let drivingLicence=await DrivingLicence.create({
            driver_id:driver_id,
            driving_licence_front:dl_front,
            driving_licence_back:dl_back,
            dL_no:dl_no
        })
        if(!drivingLicence){
            return response.responseHelper(res, false, "Can't create driving licence", "Something is wrong");
        }
        return response.responseHelper(res,true,drivingLicence,"Successfully saved");
    } catch (error) {
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

exports.SaveAddressProof= async (req,res)=>{
    const driver_id=req.driverId;
    const address_proof=req.body.address_proof;

    if(address_proof==="" || address_proof == null){
        return response.responseHelper(res,false,"Enter valid url","invalid url passed");
    }
    try {
        let addressProof=await AddressProof.create({
            driver_id:driver_id,
            address_proof:address_proof,
        })
        if(!addressProof){
            return response.responseHelper(res, false, "Can't create addess proof", "Something is wrong");
        }
        return response.responseHelper(res,true,addressProof,"Successfully saved");
    } catch (error) {
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

exports.SaveVehiclePics=async (req,res)=>{
    const driver_id= req.driverId;
    console.log(req.body);
    var vehicle_pic=[];
    vehicle_pics=req.body.vehicle_pics;
    let result=[];
    if(!vehicle_pics.length>0){
        return response.responseHelper(res,false,"provide valid url","Field required")
    }
    try {
        for(i of vehicle_pics){
            let vehiclePics= await VehiclePic.create({
                driver_id:driver_id,
                pic_url:i
            })
            if(!vehiclePics){
                continue;
            }
            result.push(vehiclePics);
        }
        return response.responseHelper(res,true,{"data":result},"Success")
    } catch (error) {
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}