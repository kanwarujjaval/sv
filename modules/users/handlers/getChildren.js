const Handler = require('./../../../classes/Handler');
const User = require('../lib/User');

class getChildrenHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.userId = request.auth.credentials.userId;
        this.user = new User(h, this.userId);
    }

    async makeResult() {
        this.result = await this.user.getChildrenForParent();
    }
}

module.exports = function (request, h) {
    return new getChildrenHandler(request, h).getResult();
};
