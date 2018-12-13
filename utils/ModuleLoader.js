const fs = require('fs');
const path = require('path');

class ModuleLoader {

    constructor(server) {
        this.server = server;
        this.routes = [];
    }

    getRoutes() {
        this.getModules().forEach(m => {
            this.routes.push(require(path.join('./../modules/', m, '/routes')));
        })
    }

    getModules() {
        return fs.readdirSync(path.join(__dirname, './../modules')).filter(m => {
            return m.indexOf('.js') <= -1;
        });
    }

    loadRoutes() {
        this.routes.forEach(r => {
            this.server.route(r);
        });
    }

    apply() {
        this.getModules();
        this.getRoutes();
        this.loadRoutes();
    }
}

module.exports = ModuleLoader;
