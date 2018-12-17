let DB = {};
try {
    DB = require('./secret.json').DB;
} catch (e) {
    console.log('running without secret.json, make sure environment variables are set.');
}
const common = {
    HOST: process.env.DB_HOST || DB.HOST || 'localhost',
    USER: process.env.DB_USER || DB.USER || 'user',
    PASSWORD: process.env.DB_PASSWORD || DB.PASSWORD || 'password',
    DATABASE: process.env.DB_NAME || DB.DATABASE || 'OCS'
};

const specific = {
    development: {},
    testing: {},
    staging: {},
    production: {}
};

class DatabaseConfig {

    constructor(ENV) {
        return Object.assign(specific[ENV], common);
    }
}

module.exports = DatabaseConfig;