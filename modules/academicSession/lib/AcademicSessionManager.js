var { insertQuery } = require('./../../../utils/Util');

class SectionManager {

    /**
     * @param toolkit : hapi response toolkil object;
     */
    constructor(toolkit) {
        this.sql = toolkit.sql;
    }

    async insertSection(section) {
        let q = insertQuery('section', section);
        await this.sql.query(q);
    }

}

module.exports = SectionManager;
