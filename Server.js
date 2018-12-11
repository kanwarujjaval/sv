const Hapi = require('hapi');
const Auth = require('./auth/Auth');

class Server {

    constructor(config, databaseConnection) {
        this.config = config.getConfig();
        databaseConnection.loadConfig(this.config.DATABASE);
        // this.connectionPool = databaseConnection.getConnection();

        this.server = Hapi.server({
            port: this.config.SERVER.PORT,
            host: this.config.SERVER.HOST
        });
    }
    
    async registerPlugins(){
        await this.server.register(new Auth().getPlugin());
    }

    async startServer() {
        let a = require('./modules/session');
        new a(this.server);
        
        await this.registerPlugins();
        await this.server.start();
        console.info(`Server running at: ${this.server.info.uri}`);
    }
}

module.exports = Server;