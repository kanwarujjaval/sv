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
            SERVER: new ServerConfig(this._env),
            DATABASE: new DatabaseConfig(this._env)
        };
    }

    /**
     * Update Config with latest values in config files.
     */
    reload() {
        const ServerConfig = Util.hotRequire('./ServerConfig');
        const DatabaseConfig = require('./DatabaseConfig');
        this.CONFIG = {
            SERVER: new ServerConfig(this._env),
            DATABASE: new DatabaseConfig(this._env)
        };
    }

    getConfig(module = null) {
        return module ? this.CONFIG[module] : this.CONFIG
    }
}

module.exports = Config;
