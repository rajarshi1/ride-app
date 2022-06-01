
module.exports = (sequelize, Sequelize) => {
    const document_types = sequelize.define('document_types', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name:{
            type:Sequelize.STRING,
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return document_types
}