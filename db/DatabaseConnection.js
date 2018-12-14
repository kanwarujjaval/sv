const mssql = require('mssql');

class DatabaseConnection {

    /**
     * @param dbConfig inject current db Config
     */
    constructor(dbConfig = null) {
        this.connection = null;
        this.CONFIG = dbConfig;
    }

    loadConfig(dbConfig){
        this.CONFIG = dbConfig;
    }

    async makeConnection() {
        if (!this.CONFIG || !this.CONFIG.HOST) {
            throw new Error('Invalid database configuration');
        }
        const config = {
            user: this.CONFIG.USER,
            password: this.CONFIG.PASSWORD,
            server: this.CONFIG.HOST,
            database: this.CONFIG.DATABASE,
            options: {
                encrypt: true
            },
            pool: {
                max: 3,
                min: 1,
                idleTimeoutMillis: 30000
            },
            parseJSON: true
        };
        let pool = new mssql.ConnectionPool(config);
        this.connection = await pool.connect();
    }

    async getConnection() {
        await this.makeConnection();
        return this.connection
    }
}

module.exports = DatabaseConnection;
