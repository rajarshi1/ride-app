const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const otp_verify_user = sequelize.define('otp_verify_user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        otp: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        otp_token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        expiry_date: { 
            type: Sequelize.STRING,
            allowNull: false,
        },
        is_deleted :{
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    return otp_verify_user
}