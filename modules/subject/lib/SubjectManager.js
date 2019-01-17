const { insertQuery } = require('./../../../utils/Util');

class SubjectManager {

    /**
     * @param toolkit : hapi response toolkit object;
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
