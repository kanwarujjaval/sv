const Module = require('./../Module');
const Util = require('./../../utils/Util');
const routes = require('./routes')

class SessionModule extends Module {

    constructor(server) {
        super(server);
        routes.forEach(r=>{
            server.route(r);
        });
    }
    
}

module.exports = SessionModule;