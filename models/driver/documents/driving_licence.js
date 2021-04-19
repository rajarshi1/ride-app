const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const driving_licence = sequelize.define('driving_licence', {
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
        driving_licence_front:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        driving_licence_back:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        dL_no:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        dl_valid_till:{
            type: Sequelize.DATETIME,
            allowNull: true,
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

    return driving_licence
}