const config = require('../../config/auth.config')
const db = require('../../models');
const response = require('../../helpers/response.helper');
const Validator = require('validator');
const User = db.users;
const OTP_User = db.otp_user;
const axios=require('axios');
const googleMapKey= process.env.GOOGLE_MAP_KEY || 'AIzaSyD_8YHqFK-jL2h8nLBt0dzb6ttHh6SGSJc'
const Address=db.address;
const UserAddress=db.user_address;

exports.SearchAddress=async (req,res)=>{
    const search_string= req.body.search_string;
    let address_array=[];
    let result=await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleMapKey}&input=${search_string}`)
        if(!result)  {
           return  response.responseHelper(res,false,"can't search addresses","Something is wrong");
        }
        const addresses = result.data.predictions;
        console.log(addresses);
            for(let address of addresses){
            let address_object = {};
            address_object['address_line_1'] = address.structured_formatting.main_text;
            address_object['address_line_2'] = address.structured_formatting.secondary_text;
            address_object['place_id'] = address.place_id;
            address_object['description'] = address.description;
            if(address.description.includes('India')){
                address_array.push(address_object)
            }
        }
        return response.responseHelper(res, true, address_array, "Address fetched successful")
}

exports.SearchAddressDetail= async(req,res)=>{
    const place_id=req.body.place_id;
    const address_line_1=req.body.address_line_1;
    const address_line_2=req.body.address_line_2;

    let result= await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${googleMapKey}&place_id=${place_id}`);
    if(!result) {
       return response.responseHelper(res,false,"Something is wrong","Invalid place id");
    }
    const address = result.data.result;
    const address_detail = {
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        city: '',
        area: '',
        country: '',
        pincode: '',
        lat: address.geometry.location.lat,
        lng: address.geometry.location.lng,
        place_id: req.body.place_id,
    };
    try {

        // address_detail.address_line_1 = ;
        address_detail.area = keyValueFinder(address.address_components, 'postal_town');
        address_detail.city = keyValueFinder(address.address_components, 'administrative_area_level_1');
        address_detail.country = keyValueFinder(address.address_components, 'country');
        address_detail.pincode = keyValueFinder(address.address_components, 'postal_code');
    } catch (error) {
        console.log(error);
    }
    return response.responseHelper(res, true, address_detail, "Address detail fetched successful")
}

keyValueFinder = (jsonArray = [], keyType) => {
    try {
        for (var k in jsonArray) {
            console.log(k, jsonArray[k]);
            if (jsonArray[k].types.includes(keyType)) {
                return jsonArray[k].long_name;
            }
        }
    } catch (error) {
        console.log(error);
    }
    return '';
};

exports.SaveAddress= async (req,res)=>{
    const user_id=req.userId;
    const address_line_1 = req.body.address_line_1;
    const address_line_2 = req.body.address_line_2;
    const area = req.body.area;
    const city = req.body.city;
    const pincode = req.body.pincode;
    const country = req.body.country;
    var lat = req.body.lat;
    var lng = req.body.lng;
    const place_id = req.body.place_id;
    const tags=req.body.tags;

    if (address_line_1 == null || address_line_1 === "" || city == null || city === "" || country == null || country === "") {
        return response.responseHelper(res, false, "All fields required", "Failed to create address");
    }
    try {
        let result= await Address.create({
            user_id:user_id,
            address_line_1:address_line_1,
            address_line_2:address_line_2,
            city:city,
            area:area,
            pincode:pincode,
            country:country,
            place_id:place_id,
            lat:lat,
            long:lng,
            tags:(tags!="")?tags:'other',
        })
        if(!result){
        return response.responseHelper(res,false,"Can't save address",'Something is wrong');
        }
        return response.responseHelper(res,true,result,'Success');
    } catch (error) {
        return response.responseHelper(res,false,'Error','Something went wrong');
    }
}
