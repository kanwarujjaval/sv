const mysql = require('mysql2/promise');

class DatabaseConnection {

    /**
     * @param dbConfig inject current db Config
     */
    constructor(dbConfig = null) {
        this.connection = null;
        this.CONFIG = dbConfig;
    }

    loadConfig(dbConfig) {
        this.CONFIG = dbConfig;
    }

    makeConfigObject() {
        if (!this.CONFIG || !this.CONFIG.HOST) {
            throw new Error('Invalid database configuration');
        }
        const config = {
            user: this.CONFIG.USER,
            password: this.CONFIG.PASSWORD,
            host: this.CONFIG.HOST,
            port: this.CONFIG.PORT,
            database: this.CONFIG.DATABASE,
            trace: this.CONFIG.TRACE,
            connectionLimit: this.CONFIG.CONNECTION_LIMIT
        };
        this.configObject = config;
    }

    async makeConnection() {
        this.makeConfigObject();
        const pool = await mysql.createPool(this.configObject);
        this.connection = pool;
        /**
         * This is a shortcut for the pool.getConnection() -> connection.query() -> connection.release() code flow. 
         * Using pool.getConnection() is useful to share connection state for subsequent queries. 
         * This is because two calls to pool.query() may use two different connections and run in parallel.
         * https://github.com/mysqljs/mysql#pooling-connections
         */
    }

    async getConnection() {
        await this.makeConnection();
        return this.connection;
    }

    async closeConnections() {
        this.connection.end();
    }
}

module.exports = DatabaseConnection;
