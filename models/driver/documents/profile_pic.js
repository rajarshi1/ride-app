const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const profile_pic = sequelize.define('profile_pic', {
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
        profile_pic:{
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

    return profile_pic
}