const Hapi = require('hapi');
const Config = require('./config/Config.js');
const DatabaseConnection = require('./db/DatabaseConnection');

const config = new Config('development').getConfig();

const databaseConnection = new DatabaseConnection(config.DATABASE);

const server = Hapi.server({
    port: config.SERVER.PORT,
    host: config.SERVER.HOST
});

const init = async () => {
    await server.start();
    console.info(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();