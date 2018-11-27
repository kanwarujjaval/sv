const mssql = require('mssql');

class DatabaseConnection {

    /**
     * @param dbConfig inject current db Config
     */
    constructor(dbConfig = null) {
        this.connection = null;
        this.CONFIG = dbConfig;
        if (!this.CONFIG || !this.CONFIG.HOST) {
            throw new Error('Invalid database configuration');
        }
    }

    async makeConnection() {
        const config = {
            user: this.CONFIG.USER,
            password: this.CONFIG.PASSWORD,
            server: this.CONFIG.HOST,
            database: this.CONFIG.DATABASE,
            options: {
                encrypt: true
            }
        };
        let pool = await mssql.connect(config);
        this.connection = pool;
    }

    async getConnection() {
        await this.makeConnection();
        return this.connection
    }
}

module.exports = DatabaseConnection;