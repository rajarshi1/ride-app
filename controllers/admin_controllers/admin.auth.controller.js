const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config')
const db = require('../../models');
const response = require('../../helpers/response.helper');
const Validator = require('validator');
const Admin = db.admin;
const User = db.users;
const Drivers = db.driver;

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

exports.ViewUsers = async(req,res) =>{
    try {
        const users = await User.findAll({
            attributes: ['first_name', 'email', 'phone']
          });
        //console.log(users.every(user => user instanceof User)); // true
        console.log("All users:", JSON.stringify(users, null, 2));
        
        if(!users){
            return response.responseHelper(res, false, "Users not found","Something went wrong");
        } 
        return response.responseHelper(res, true, users,"success");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong"); 
    }
}

exports.ViewDrivers = async(req,res) =>{
    try {
        const drivers = await Drivers.findAll({
            attributes: ['first_name', 'email', 'phone']
          });
        console.log("All drivers:", JSON.stringify(drivers, null, 2));
        
        if(!drivers){
            return response.responseHelper(res, false, "Drivers not found","Something went wrong");
        } 
        return response.responseHelper(res, true, drivers,"success");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong"); 
    }
}

exports.NotApprovedDrivers = async(req,res) =>{
     const page_no=req.query.page_no;
     const max=5;
    //  const offsetVal=(max * page_no)+1;
     const offsetVal= page_no*max;
    try {
        const drivers = await Drivers.findAll({
            where:{
                is_verified:0
            },
            attributes:['first_name','email','phone'],
            limit:max,
            offset:offsetVal,
        })
        //console.log("All drivers:", JSON.stringify(drivers, null, 2));
        
        if(!drivers){
            return response.responseHelper(res, false, "Drivers not found","Something went wrong");
        } 
        let driversCount = await Drivers.count({
            where:{
                is_verified:0
            },
        })
        return response.responseHelper(res, true, {
            "current_page":Number(page_no)+1,
            "count":driversCount,
            "data":drivers,
            "pages":Math.ceil(driversCount/max)
        },"success");
    } catch (error) {
       // console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong"); 
    }
}

exports.NotApprovedDriver = async(req,res) =>{
    const driver_id = req.body.driver_id;
    try {
        let driver = await Drivers.findOne({
            where: {
                id: driver_id,
                is_deleted: 0,
            },
            attributes: ['id', 'first_name', 'last_name', 'email','phone', "DOB", 'gender']
        })
        if (!driver) {
            return response.responseHelper(res, false, "Driver not found", "Invalid id");
        }
        return response.responseHelper(res, true, driver, "Success");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}