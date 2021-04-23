module.exports = (sequelize, Sequelize) => {
    const banks = sequelize.define('banks', {
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

    return banks
}