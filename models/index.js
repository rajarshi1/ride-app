const Sequelize = require('sequelize');
const config = require('../config/db.config.js');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    port: config.port,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    }
});

const db = {};
db.sequelize = sequelize;
// defining models

db.admin = require('./admin/admin_model')(sequelize,Sequelize);

db.driver = require('./driver/driver_model')(sequelize, Sequelize);

db.otp_driver = require('./driver/otp_verify_driver')(sequelize, Sequelize);

db.document_status = require('./driver/doc_status')(sequelize, Sequelize);

db.driver_documents = require('./driver/driver_documents')(sequelize, Sequelize);

db.address_proof = require('./driver/documents/address_proof')(sequelize, Sequelize);

db.driving_licence = require('./driver/documents/driving_licence')(sequelize, Sequelize);

db.insurance = require('./driver/documents/insurance')(sequelize, Sequelize);

db.profile_pic = require('./driver/documents/profile_pic')(sequelize, Sequelize);

db.vehicle_pic = require('./driver/documents/vehicle_pic')(sequelize, Sequelize);

db.vehicle_rc = require('./driver/documents/vehicle_rc')(sequelize,Sequelize);

db.users = require('./user/user_model')(sequelize, Sequelize);

db.otp_user = require('./user/otp_verify_user')(sequelize, Sequelize);

// defining associations
db.otp_driver.belongsTo(db.driver, {
    foreignKey: {
        name: "driver_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.driver, {
    foreignKey: {
        name: "driver_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.insurance.belongsTo(db.driver, {
    foreignKey: {
        name: "driver_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})
db.profile_pic.belongsTo(db.driver, {
    foreignKey: {
        name: "driver_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.address_proof.belongsTo(db.driver, {
    foreignKey: {
        name: "driver_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.driving_licence.belongsTo(db.driver, {
    foreignKey: {
        name: "driver_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.vehicle_pic.belongsTo(db.driver, {
    foreignKey: {
        name: "driver_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.vehicle_rc.belongsTo(db.driver, {
    foreignKey: {
        name: "driver_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.insurance, {
    foreignKey: {
        name: "insurance_id",
        allowNull: true,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.profile_pic, {
    foreignKey: {
        name: "profile_pic_id",
        allowNull: true,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.driving_licence, {
    foreignKey: {
        name: "dl_id",
        allowNull: true,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.address_proof, {
    foreignKey: {
        name: "address_proof_id",
        allowNull: true,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.vehicle_pic, {
    foreignKey: {
        name: "vehicle_pic_id",
        allowNull: true,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.vehicle_rc, {
    foreignKey: {
        name: "vehicle_rc_id",
        allowNull: true,
        onDelete: 'CASCADE'
    }
})

db.otp_user.belongsTo(db.users, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.insurance.belongsTo(db.document_status, {
    foreignKey: {
        name: "status",
    }
})
db.profile_pic.belongsTo(db.document_status, {
    foreignKey: {
        name: "status",
    }
})

db.address_proof.belongsTo(db.document_status, {
    foreignKey: {
        name: "status",
    }
})

db.driving_licence.belongsTo(db.document_status, {
    foreignKey: {
        name: "status",
    }
})

db.vehicle_pic.belongsTo(db.document_status, {
    foreignKey: {
        name: "status",
    }
})

db.vehicle_rc.belongsTo(db.document_status, {
    foreignKey: {
        name: "status",
    }
})

db.banks=require('../models/banks_model')(sequelize,Sequelize);

db.driver.belongsTo(db.banks,{
    foreignKey:{
        name:'bank_id'
    }
})

db.user_referrals=require('../models/user/user_referrals')(sequelize,Sequelize);
db.driver_referrals=require('../models/driver/driver_referrals')(sequelize,Sequelize);

db.users.belongsTo(db.user_referrals,{
    foreignKey:{
        name:"referred_by"
    }
})

db.driver.belongsTo(db.driver_referrals,{
    foreignKey:{
        name:"referred_by"
    }
})

module.exports = db