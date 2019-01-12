const Handler = require('./../../../classes/Handler');
const SubjectManager = require('./../lib/SubjectManager');

class postSubjectHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.subjectManager = new SubjectManager(h);
    }

    async saveSubject() {
        let subject = this.request.payload;
        this.subjectManager.insertSubject(subject);
    }

    async makeResult() {
        this.saveSubject();
        this.result = {}
    }

}

module.exports = function (request, h) {
    return new postSubjectHandler(request, h).getResult();
};
