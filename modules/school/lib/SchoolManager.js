const Boom = require('boom');

class SessionManager {

    /**
     * @param sql : sql object decorated on response toolkit, to execute sql queries as sql.query();
     */
    constructor(sql) {
        this.sql = sql;
    }

    async insertSchool(school) {

    }

}

module.exports = SessionManager;
