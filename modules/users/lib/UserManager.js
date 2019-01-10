const Boom = require('boom');
var { insertQuery } = require('./../../../utils/Util');

class UserManager {

    /**
     * @param sql : sql object decorated on response toolkit, to execute sql queries as sql.query();
     */
    constructor(toolkit) {
        this.sql = toolkit.sql;
        this.parse = toolkit.parse;
    }

    async insertUser(user) {
        let q = insertQuery('user', user);
        await this.sql.query(q);
    }

}

module.exports = UserManager;
