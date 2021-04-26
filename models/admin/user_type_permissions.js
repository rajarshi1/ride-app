module.exports = (sequelize, Sequelize) => {
    const user_permissions = sequelize.define('user_permissions', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        document_type_id: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        read: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
        },
        write: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
        },
        distcrict_restricted:{
            type: Sequelize.TINYINT,
            defaultValue: 0,
        },
        state_restricted:{
            type: Sequelize.TINYINT,
            defaultValue: 0,
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return user_permissions
}