const Handler = require('./../../../classes/Handler');
const Boom = require('boom');
const SchoolManager = require('./../lib/SchoolManager');

class postSchoolHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.schoolManager = new SchoolManager(h.sql);
    }

    async saveSchool() {
        let school = this.request.payload;
        this.schoolManager.insertSchool(school);
    }

    async makeResult() {
        this.result = {}
    }

}

module.exports = function (request, h) {
    return new postSchoolHandler(request, h).getResult();
};
