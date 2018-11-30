const SECRET = require('./secret.json');
const common = {
    HOST: process.env.DB_HOST || SECRET.DB.HOST || 'localhost',
    USER: process.env.DB_USER || SECRET.DB.USER || 'user',
    PASSWORD: process.env.DB_PASSWORD || SECRET.DB.PASSWORD || 'password',
    DATABASE: process.env.DB_NAME || SECRET.DB.DATABASE || 'OCS'
};

const specific = {
    development: {},
    testing: {},
    staging: {},
    production: {}
};

class DatabaseConfig{

    constructor(ENV){
        return Object.assign(specific[ENV], common);
    }
}

module.exports = DatabaseConfig;