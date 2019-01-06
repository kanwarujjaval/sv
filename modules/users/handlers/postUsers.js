const Handler = require('./../../../classes/Handler');
const Boom = require('boom');
const UserManager = require('../lib/UserManager');

class postSchoolHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.userManager = new UserManager(h.sql);
    }

    async saveUser() {
        let school = this.request.payload;
        this.userManager.insertUser(school);
    }

    async makeResult() {
        this.result = {}
    }

}

module.exports = function (request, h) {
    return new postSchoolHandler(request, h).getResult();
};
