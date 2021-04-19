const CONFIG = {}; // Make this global to use all over the application

CONFIG.app = process.env.APP || 'comride-dev';
CONFIG.port = process.env.PORT || '3033';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'comride-dev.cwzzcqb2cmzz.ap-south-1.rds.amazonaws.com';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'comride';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'root12345';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'please_change_at_production';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';

module.exports = CONFIG;