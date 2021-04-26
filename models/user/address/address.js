
module.exports = (sequelize, Sequelize) => {
    const address = sequelize.define('address', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        address_line_1: {
            type: Sequelize.STRING,
        },
        address_line_2: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        area: {
            type: Sequelize.STRING,
        },
        pincode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        country: {
            type: Sequelize.STRING,
        },
        place_id:{
            type:Sequelize.STRING,
        },
        lat:{
            type:Sequelize.STRING, 
            allowNull: false
        },
        long:{
            type:Sequelize.STRING,
            allowNull: false
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    })

    return address
}