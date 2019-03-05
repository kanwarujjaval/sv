const Boom = require('boom');
const {insertQuery} = require('./../../../utils/Util');

class User {

    /**
     *
     * @param toolkit : hapi response toolkit object;
     * @param id : User Id
     */
    constructor(toolkit, id) {
        this.sql = toolkit.sql;
        this.escape = toolkit.escape;
        this.id = id;
        if (!this.id) {
            throw Boom.internal('Invalid user initialization');
        }
    }

    /**
     *
     * @param user
     * @returns {Promise<void>}
     */
    async insertUser(user) {
        let q = insertQuery('user', user);
        await this.sql.query(q);
    }

    /**
     *
     * @returns {Promise<*>}
     */
    async getChildrenForParent() {
        let q = `
          SELECT user.firstName,
                 user.lastName,
                 user.academicSessionId,
                 user.type,
                 user.id
          FROM parentChildrenRelation
                 LEFT JOIN user ON parentChildrenRelation.chldUserId = user.id
          WHERE parentUserId = ${this.escape(this.id)}`;
        let [res] = await this.sql.query(q);
        return res;
    }

}

module.exports = User;