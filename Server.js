const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Auth = require('./auth/Auth');
const PluginLoader = require('./utils/PluginLoader');
const ModuleLoader = require('./utils/ModuleLoader');
const {failActionHandler, queryParser} = require('./utils/Util');
const SqlString = require('sqlstring');

class Server {

    constructor(config, databaseConnection) {
        this.config = config.getConfig();
        this.databaseConnection = databaseConnection;
        this.databaseConnection.loadConfig(this.config.DATABASE);
        this.server = Hapi.server({
            port: this.config.SERVER.PORT,
            host: this.config.SERVER.HOST,
            routes: {
                validate: {
                    failAction: failActionHandler
                }
            }
        });
    }

    async registerRoutes() {
        new ModuleLoader(this.server).apply();
    }

    async registerAuth() {
        await new Auth(this.server).registerAuth();
    }

    async registerPlugins() {
        await this.server.register([
            Inert,
            Vision
        ]);
        await new PluginLoader(this.server).register();
    }

    async decorateServer() {
        this.connectionPool = await this.databaseConnection.getConnection();
        this.server.decorate('toolkit', 'sql', this.connectionPool);
        this.server.decorate('toolkit', 'parse', queryParser(SqlString.escape));
        this.server.decorate('toolkit', 'escape', SqlString.escape);
        // allows query to be available in handlers on h.sql.query(`select 1+1 as two`)
        // console.log(await this.connectionPool.query(queryParser(this.connectionPool.escape)`select 1+1 as two`));

        const preResponse = function (request, h) {
            const response = request.response;
            if (response.isBoom) {
                console.log(response);
                if (response.code) {
                    request.response.output.payload.errorCode = response.code;
                }
            }
            return h.continue;
        };
        this.server.ext('onPreResponse', preResponse);
    }

    async startServer() {
        await this.decorateServer();
        await this.registerAuth();
        await this.registerRoutes();
        await this.registerPlugins();
        await this.server.start();
        console.info(`Server running at: ${this.server.info.uri}`);
    }
}

module.exports = Server;
