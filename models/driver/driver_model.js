const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const driver = sequelize.define('driver', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        first_name: {
            type: Sequelize.STRING,
        },
        last_name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        DOB:{
            type:Sequelize.DATE,
        },
        gender:{
            type:Sequelize.INTEGER,  /// 1- male 2 - female 3- other
        },
        bank_name:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        account_holder_name:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        account_number:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        otp_verified:{
            type:Sequelize.TINYINT,
            defaultValue:0,
        },
        isProfileUpdated:{
            type:Sequelize.TINYINT,
            defaultValue:0,
        },
        ifsc_code:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        vehical_no:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        is_verified:{
            type:Sequelize.TINYINT,
            defaultValue:0,
        },
        referral_code:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        rating:{
            type:Sequelize.DOUBLE,
            defaultValue:0
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return driver
}