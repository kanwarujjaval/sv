var {insertQuery} = require('./../../../utils/Util');

class SectionManager {

    /**
     * @param toolkit : hapi response toolkit object;
     */
    constructor(toolkit) {
        this.sql = toolkit.sql;
    }

    async createSession() {
        let batchId = await this.insertBatch();
        let sectionId = await this.insertSection();
        let academicSessionId = await this.insertAcademicSession();

    }

    async insertSection(section) {
        let q = insertQuery('section', section);
        let res = await this.sql.query(q);
        return res && res[0] && res[0].insertId ? res[0].insertId : null;
    }

    async insertAcademicSession(acedemicSession) {
        let q = insertQuery('acedemicSession', acedemicSession);
        let res = await this.sql.query(q);
        return res && res[0] && res[0].insertId ? res[0].insertId : null;
    }

    async insertBatch(batch) {
        let q = insertQuery('batch', batch);
        let res = await this.sql.query(q);
        return res && res[0] && res[0].insertId ? res[0].insertId : null;
    }

}

module.exports = SectionManager;
