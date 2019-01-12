const Handler = require('./../../../classes/Handler');
const AcademicSessionManager = require('./../lib/AcademicSessionManager');

class postClassHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.academicSessionManager = new AcademicSessionManager(h);
    }

    async saveClass() {
        let _class = this.request.payload;
        this.academicSessionManager.insertClass(_class);
    }

    async makeResult() {
        this.saveSubject();
        this.result = {}
    }

}

module.exports = function (request, h) {
    return new postClassHandler(request, h).getResult();
};
