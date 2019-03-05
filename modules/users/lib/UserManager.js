const Boom = require('boom');
const {insertQuery} = require('./../../../utils/Util');

class UserManager {

    /**
     * @param toolkit : hapi response toolkit object;
     */
    constructor(toolkit) {
        this.sql = toolkit.sql;
        this.escape = toolkit.escape;
    }

    async insertUser(user) {
        let q = insertQuery('user', user);
        await this.sql.query(q);
    }

    async getChildren(userId) {
        let q = `
          SELECT user.firstName,
                 user.lastName,
                 user.academicSessionId,
                 user.type,
                 user.id
          FROM parentChildrenRelation
                 LEFT JOIN user ON parentChildrenRelation.chldUserId = user.id
          WHERE parentUserId = ${this.escape(userId)}`;
        let [res] = await this.sql.query(q);
        return res;
    }

}

module.exports = UserManager;
