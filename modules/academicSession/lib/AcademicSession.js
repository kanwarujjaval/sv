const {insertQuery} = require('./../../../utils/Util');
const Boom = require('boom');

class AcademicSessionManager {

    /**
     *
     * @param toolkit: hapi response toolkit object;
     * @param id
     */
    constructor(toolkit, id) {
        this.sql = toolkit.sql;
        this.escape = toolkit.escape;
        this.id = id || null;
        this.academicSession = null;
    }

    /**
     * Load the data of the academic session
     * If no academic session id is provided call create method
     * @returns {Promise<void>}
     */
    async load() {
        if (!this.id) {
            throw Boom.internal('Invalid academicSession load');
        }
        let [res] = this.sql.query(`
          SELECT *
          FROM academicSession
          where id = ${this.id}`);
        this.academicSession = res;              // TODO CHANGE TO ACTUAL SESSION DATA
    }

    /**
     * Create a new academic session
     * @returns {Promise<void>}
     */
    async create({startDate, endDate, batchId, schoolId}) {
        let obj = {active: 0, startDate, endDate, batchId, schoolId};
        let q = insertQuery('academicSession', obj);
        let [res] = await this.sql.query(q);
        this.id = res;                      // TODO CHANGE TO ID
        return res;
    }

    /**
     *
     * @param startDate
     */
    startSession(startDate = Date.now()) {
        this.sql.query(`
          UPDATE academicSession
          SET startDate = ${startDate}, active = 1 WHERE id = ${this.id}`);
    }

    /**
     *
     * @param endDate
     */
    endSession(endDate = Date.now) {
        this.sql.query(`
          UPDATE academicSession
          SET endDate = ${endDate}, active = 0 WHERE  id = ${this.id}`);
    }

    /**
     *
     * @param childUserIds
     */
    linkChildrenToAcademicSessionBulk(childUserIds) {
        let insertArray = [];
        childUserIds.forEach(function (entry) {
            insertArray.push([this.id, entry]);
        });
        let q = `INSERT INTO academicSessionStudent (academicSessionId, studentUserId)
                 VALUES ?`;
        this.sql.query(q, insertArray);
    }

    /**
     *
     * @param teacherUserId
     * @param subjectId
     */
    linkTeacherToAcademicSession(teacherUserId, subjectId) {
        let q = `INSERT INTO academicSessionTeacher (academicSessionId, teacherUserId, subjectId)
                 VALUES (${this.id},${teacherUserId},${subjectId})`;
        this.sql.query(q);
    }

    /**
     *
     * @param childUserId
     */
    linkChildrenToAcademicSession(childUserId) {
        let q = `INSERT INTO academicSessionStudent (academicSessionId, studentUserId)
                 VALUES (${this.id},${childUserId})`;
        this.sql.query(q);
    }

    modules() {
        // academicSessionAttendance
        // academicSessionCoreSubject
        // academicSessionElectiveSubject
        // academicSessionExam
        // academicSessionResult
        // academicSessionStudent
        // academicSessionTeacher
    }

}

module.exports = AcademicSessionManager;
