const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const driver_documents = sequelize.define('driver_documents', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        driver_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dl_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        insurance_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        address_proof_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        profile_pic_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status:{
            type:Sequelize.INTEGER,
            defaultValue:1
        },
        vehicle_pic_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return otp_verify_driver
}