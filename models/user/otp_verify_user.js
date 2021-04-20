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
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        otp: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        otp_token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        expiry_date: { 
            type: Sequelize.DATE,
            allowNull: false,
        },
        is_deleted :{
            type: Sequelize.TINYINT,
            defaultValue:0
        },
    })

    return otp_verify_user
}