const {insertQuery} = require('./../../../utils/Util');

class BatchManager {

    /**
     * @param toolkit : hapi response toolkit object;
     */
    constructor(toolkit) {
        this.sql = toolkit.sql;
        this.escape = toolkit.escape;
    }

    async insertBatch(batch) {
        let q = insertQuery('batch', batch);
        await this.sql.query(q);
    }

}

module.exports = BatchManager;
