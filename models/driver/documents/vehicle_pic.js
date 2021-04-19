const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const vehicle_pic = sequelize.define('vehicle_pic', {
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
        pic_url:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        status:{
            type:Sequelize.TINYINT,
            defaultValue:1
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return vehicle_pic
}