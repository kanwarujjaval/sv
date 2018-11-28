const Util = require('./../utils/Util');
const ServerConfig = require('./ServerConfig');
const DatabaseConfig = require('./DatabaseConfig');

class Config {
    /**
     * create a new config
     * @param {String} env - The process environment.
     */
    constructor(env) {
        this._env = env;
        this.CONFIG = {
            SERVER: new ServerConfig(env),
            DATABASE: new DatabaseConfig(env)
        };
    }

    /**
     * Update Config with latest values in config files.
     */
    reload() {
        let server = Util.hotRequire('./server');
        this.SERVER = server(this._env);
    }

    getConfig(module = null) {
        return module ? this.CONFIG[module] : this.CONFIG
    }
}

module.exports = Config;