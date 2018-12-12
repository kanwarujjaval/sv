const requireDir = require('./Util').requireDir;
const path = require('path');

class PluginLoader {

    constructor(server) {
        this.server = server;
    }

    async register() {
        this.plugins = requireDir(path.join(__dirname, './../plugins'));
        for (let plugin in this.plugins) {
            await this.server.register(this.plugins[plugin].plugin.register, this.plugins[plugin].options)
        }
    }
}

module.exports = PluginLoader;