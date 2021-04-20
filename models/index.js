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
    },
});

const db = {};
db.sequelize = sequelize;
// defining models

db.driver = require('./driver/driver_model')(sequelize, Sequelize);

db.otp_driver = require('./driver/otp_verify_driver')(sequelize, Sequelize);

db.document_status = require('./driver/doc_status')(sequelize, Sequelize);

db.driver_documents = require('./driver/driver_documents')(sequelize, Sequelize);

db.address_proof = require('./driver/documents/address_proof')(sequelize, Sequelize);

db.driving_licence = require('./driver/documents/driving_licence')(sequelize, Sequelize);

db.insurance = require('./driver/documents/insurance')(sequelize, Sequelize);

db.profile_pic = require('./driver/documents/profile_pic')(sequelize, Sequelize);

db.vehicle_pic = require('./driver/documents/vehicle_pic')(sequelize, Sequelize);

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

db.driver_documents.belongsTo(db.insurance, {
    foreignKey: {
        name: "insurance_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.profile_pic, {
    foreignKey: {
        name: "profile_pic_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.driving_licence, {
    foreignKey: {
        name: "dl_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.address_proof, {
    foreignKey: {
        name: "address_proof_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.vehicle_pic, {
    foreignKey: {
        name: "vehicle_pic_id",
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.driver_documents.belongsTo(db.document_status, {
    foreignKey: {
        name: "status_id",
        allowNull: false,
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

module.exports = db