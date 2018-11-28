const ENV = process.env.NODE_ENV || 'development';
const Config = require('./config/Config.js');
const DatabaseConnection = require('./db/DatabaseConnection');
const Server = require('./Server');
const Logger = require('./utils/Logger');
/*
TODO: attach logger to server to be allowed global use.
 */

const config = new Config(ENV);
const databaseConnection = new DatabaseConnection();

const server = new Server(config, databaseConnection);

process.on('unhandledRejection', (err) => {
    Logger.error(err);
    process.exit(1);
});