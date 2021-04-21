const crypto = require('../../crypto');

module.exports = (sequelize, Sequelize) => {
    const vehicle_rc = sequelize.define('vehicle_rc', {
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
        rc_picture:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        rc_no:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        valid_till:{
            type:Sequelize.DATE,
            allowNull:true,
        },
        status:{
            type:Sequelize.INTEGER,
            defaultValue:1
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return vehicle_rc
}