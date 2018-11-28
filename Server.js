const Hapi = require('hapi');

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

    async startServer() {
        await this.server.start();
        console.info(`Server running at: ${this.server.info.uri}`);
    }
}

module.exports = Server;