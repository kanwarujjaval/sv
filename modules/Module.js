class Module {

    constructor(server) {
        this.server = server;
    }

    registerRoutes() {
        this.server.route();
    }

    registerHandler() {
        this.server.handler();
    }

}

module.exports = Module;