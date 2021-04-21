const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const admin = sequelize.define('admin', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return admin
}