const requireDir = require('./Util').requireDir;
const path = require('path');

class PluginLoader {

    constructor(server) {
        this.server = server;
    }

    getConf() {

    }

    load() {
        return function (server, options, next) {
            this.server = server;
            this.options = options;
            this.next = next;
            this.server.register(this.plugin, this.registerAuth);
        }
    }

    getPugin() {
        return {
            register: this.load.call(this),
            name: 'auth-jwt',
        };
    }

    register() {
        this.plugins = requireDir(path.join(__dirname, './../plugins'));
        console.log(this.plugins);
        for (let plugin in this.plugins) {
            this.server.register(this.plugins[plugin].get())
        }
    }
}

module.exports = PluginLoader;