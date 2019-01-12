const Handler = require('./../../../classes/Handler');
const SchoolManager = require('./../lib/SchoolManager');

class postSchoolHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.schoolManager = new SchoolManager(h);
    }

    async saveSchool() {
        let school = this.request.payload;
        this.schoolManager.insertSchool(school);
    }

    async makeResult() {
        this.saveSchool();
        this.result = {}
    }

}

module.exports = function (request, h) {
    return new postSchoolHandler(request, h).getResult();
};
