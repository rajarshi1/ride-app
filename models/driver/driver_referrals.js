const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const driver_referrals = sequelize.define('driver_referrals', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        referred_by:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        referred_to:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        referral_code:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        is_deleted:{
            type:Sequelize.TINYINT,
            defaultValue:0,
        }
    })

    return driver_referrals
}