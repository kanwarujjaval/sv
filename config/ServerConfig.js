const os = require('os');
const INSTANCE_ID = process.env.INSTANCE_ID || 0;
const PROCESSORS = os.cpus().length;
const HOSTNAME = os.hostname();
const HOST = process.env.HOST || '0.0.0.0';

const common = {
    INSTANCE_ID: INSTANCE_ID,
    PORT: process.env.PORT || 3000,
    PROCESSORS: PROCESSORS,
    HOST: process.env.IP || HOST,
    HOSTNAME: HOSTNAME
};

const specific = {
    development: {},
    testing: {},
    staging: {},
    production: {}
};

class ServerConfig {

    constructor(ENV) {
        return Object.assign(specific[ENV], common);
    }
}

module.exports = ServerConfig;
