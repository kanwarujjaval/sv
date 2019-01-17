const Boom = require('boom');
const { insertQuery } = require('./../../../utils/Util');

class UserManager {

    /**
     * @param toolkit : hapi response toolkit object;
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
