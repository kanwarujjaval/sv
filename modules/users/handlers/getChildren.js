const Handler = require('./../../../classes/Handler');
const UserManager = require('../lib/UserManager');

class getChildrenHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.userManager = new UserManager(h);
        this.userId = request.auth.credentials.userId;
    }

    async makeResult() {
        this.result = await this.userManager.getChildren(this.userId);
    }
}

module.exports = function (request, h) {
    return new getChildrenHandler(request, h).getResult();
};
