const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const admin = sequelize.define('admin', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone:{
            type:Sequelize.STRING,
            allowNull:false
        },
        user_type_id:{
            type:Sequelize.INTEGER,
            allowNull:false,  
        },
        district_id:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        state_id:{
            type:Sequelize.INTEGER,
            allowNull:false
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