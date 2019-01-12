var { insertQuery } = require('./../../../utils/Util');

class SubjectManager {

    /**
     * @param toolkit : hapi response toolkil object;
     */
    constructor(toolkit) {
        this.sql = toolkit.sql;
    }

    async insertSubject(subject) {
        let q = insertQuery('subject', subject);
        await this.sql.query(q);
    }

}

module.exports = SubjectManager;
