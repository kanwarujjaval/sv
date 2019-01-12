const Boom = require('boom');
var { insertQuery } = require('./../../../utils/Util');

class UserManager {

    /**
     * @param toolkit : hapi response toolkil object;
     */
    constructor(toolkit) {
        this.sql = toolkit.sql;
    }

    async insertUser(user) {
        let q = insertQuery('user', user);
        await this.sql.query(q);
    }

}

module.exports = UserManager;
