
module.exports = (sequelize, Sequelize) => {
    const user_address = sequelize.define('user_address', {
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
        home_address: {
            type: Sequelize.STRING,
        },
        work_address: {
            type: Sequelize.STRING,
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    })

    return user_address
}