const Boom = require('boom');

class SessionManager {

    /**
     * @param sql : sql object decorated on response toolkit, to execute sql queries as sql.query();
     */
    constructor(sql) {
        this.sql = sql;
    }

    async insertUser(user) {
        // let q = ;

        await this.sql.query`INSERT INTO users (${Object.keys(user).map(col => `[${col}]`).join(',')}) VALUES (${Object.values(user).map(col => `'${col}'`).join(',')})`;
    }

}

module.exports = SessionManager;
