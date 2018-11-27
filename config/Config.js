const Util = require('./../utils/Util');

class Config {
    /**
     * create a new config
     * @param {String} env - The process environment.
     */
    constructor(env) {
        this._env = env;
        this.CONFIG = {
            SERVER: require('./server')(env),
            DATABASE: require('./database')(env)
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