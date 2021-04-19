const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');
const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const insurance = sequelize.define('insurance', {
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
        insurance_pic:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        insurance_no:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        insurance_type:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        insurance_valid_till:{
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

    return insurance
}