const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Auth = require('./auth/Auth');
const PluginLoader = require('./utils/PluginLoader');

class Server {

    constructor(config, databaseConnection) {
        this.config = config.getConfig();
        databaseConnection.loadConfig(this.config.DATABASE);
        this.connectionPool = databaseConnection.getConnection();

        this.server = Hapi.server({
            port: this.config.SERVER.PORT,
            host: this.config.SERVER.HOST
        });
    }

    async registerRoutes(){
        let a = require('./modules/session');
        new a(this.server);
    }

    async registerAuth(){
        await new Auth(this.server).registerAuth();
    }

    async registerPlugins() {
        await this.server.register([
            Inert,
            Vision,
        ]);
        await new PluginLoader(this.server).register();
    }

    async startServer() {
        await this.registerAuth();
        await this.registerRoutes();
        await this.registerPlugins();
        await this.server.start();
        console.info(`Server running at: ${this.server.info.uri}`);
    }
}

module.exports = Server;