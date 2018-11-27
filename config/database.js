const common = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'user',
    PASSWORD: process.env.DB_PASSWORD || 'password',
    DATABASE: process.env.DB_NAME || 'OCS'
};

const specific = {
    development: {},
    testing: {},
    staging: {},
    production: {}
};

const config = (ENV) => {
    return Object.assign(specific[ENV], common);
};

module.exports = config;