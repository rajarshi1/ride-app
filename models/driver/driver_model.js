const crypto = require('../crypto');

module.exports = (sequelize, Sequelize) => {
    const driver = sequelize.define('driver', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        country_code:{
            type:Sequelize.STRING,
            allowNull:false,
            defaultValue:'91'
        },
        first_name: {
            type: Sequelize.STRING,
        },
        last_name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        DOB:{
            type:Sequelize.DATE,
        },
        gender:{
            type:Sequelize.INTEGER,  /// 1- male 2 - female 3- other
        },
        bank_id:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        account_holder_name:{
            type:Sequelize.STRING,
            allowNull:true,
            set(value) {
                // Hashing the value with an appropriate cryptographic hash function is better.
                this.setDataValue('account_holder_name', crypto.encrypt(value));
            },
            get() {
                const storedValue = this.getDataValue('account_holder_name');
                const value = crypto.decrypt(storedValue);
                return value;
            },
        },
        account_number:{
            type:Sequelize.STRING,
            allowNull:true,
            set(value) {
                this.setDataValue('account_number', crypto.encrypt(value));
            },
            get() {
                const storedValue = this.getDataValue('account_number');
                const value = crypto.decrypt(storedValue);
                return value;
            },
        },
        otp_verified:{
            type:Sequelize.TINYINT,
            defaultValue:0,
        },
        isProfileUpdated:{
            type:Sequelize.TINYINT,
            defaultValue:0,
        },
        ifsc_code:{
            type:Sequelize.STRING,
            allowNull:true,
            set(value) {
                // Hashing the value with an appropriate cryptographic hash function is better.
                this.setDataValue('ifsc_code', crypto.encrypt(value));
            },
            get() {
                const storedValue = this.getDataValue('ifsc_code');
                const value = crypto.decrypt(storedValue);
                return value;
            },
        },
        vehical_no:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        is_verified:{
            type:Sequelize.TINYINT,
            defaultValue:0,
        },
        referral_code:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        rating:{
            type:Sequelize.DOUBLE,
            defaultValue:0
        },
        vehicle_model:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        driver_status:{
            type:Sequelize.STRING,
            allowNull:false,
            defaultValue:'offline',
        },
        is_deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    })

    return driver
}