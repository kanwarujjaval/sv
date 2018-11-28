const os = require('os');
const INSTANCE_ID = process.env.INSTANCE_ID || 0;
const PROCESSORS = os.cpus().length;
const HOSTNAME = os.hostname();
const HOST = 'localhost';

const common = {
    INSTANCE_ID: INSTANCE_ID,
    PORT: 3000 + parseInt(INSTANCE_ID),
    PROCESSORS: PROCESSORS,
    HOST: HOST,
    HOSTNAME: HOSTNAME
};

const specific = {
    development: {},
    testing: {},
    staging: {},
    production: {}
};

class ServerConfig{

    constructor(ENV){
        return Object.assign(specific[ENV], common);
    }
}

module.exports = ServerConfig;