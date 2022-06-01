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
        },
        dl_id:{
            type: Sequelize.INTEGER,
        },
        insurance_id:{
            type: Sequelize.INTEGER,
        },
        address_proof_id:{
            type: Sequelize.INTEGER,
        },
        profile_pic_id:{ 
            type: Sequelize.INTEGER,
        },
        vehicle_pic_id:{
            type:Sequelize.INTEGER,
        },
        vehicle_rc_id:{
            type:Sequelize.INTEGER,
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return driver_documents
}