var { insertQuery } = require('./../../../utils/Util');

class SchoolManager {

    /**
     * @param toolkit : hapi response toolkit object;
     */
    constructor(toolkit) {
        this.sql = toolkit.sql;
    }

    async insertSchool(school) {
        let q = insertQuery('school', school);
        await this.sql.query(q);
    }

}

module.exports = SchoolManager;
