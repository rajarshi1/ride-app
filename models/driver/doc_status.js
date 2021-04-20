const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const document_status = sequelize.define('document_status', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        status:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return document_status
}