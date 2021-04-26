const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const distcricts = sequelize.define('distcricts', {
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
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return distcricts
}