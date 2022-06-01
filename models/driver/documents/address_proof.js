const crypto = require('../../crypto');

module.exports = (sequelize, Sequelize) => {
    const address_proof = sequelize.define('address_proof', {
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
        address_proof:{
            type: Sequelize.STRING,
            allowNull: false,
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

    return address_proof
}