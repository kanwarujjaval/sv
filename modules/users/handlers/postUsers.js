const Handler = require('./../../../classes/Handler');
const Boom = require('boom');
const UserManager = require('../lib/UserManager');

class postUserHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.userManager = new UserManager(h);
    }

    async saveUser() {
        let user = this.request.payload;
        return await this.userManager.insertUser(user);
    }

    async makeResult() {
        this.result = await this.saveUser();
    }
}

module.exports = function (request, h) {
    return new postUserHandler(request, h).getResult();
};
