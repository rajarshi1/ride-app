const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('user', {
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
            type:Sequelize.DATEONLY,
        },
        gender:{
            type:Sequelize.INTEGER,  // 1- male 2 - female 3- other
        },
        otp_verified:{
            type:Sequelize.TINYINT,
            defaultValue:0,
        },
        profile_pic:{
            type:Sequelize.STRING,
        },
        isProfileUpdated:{
            type:Sequelize.TINYINT,
            defaultValue:0,
        },
        referral_code:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        referred_by:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        country_code:{
            type:Sequelize.STRING,
            allowNull:false,
        }
    })

    return user
}