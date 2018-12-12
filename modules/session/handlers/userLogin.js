const Handler = require('./../../../classes/Handler');

class userLoginHandler extends Handler {
    constructor(request, h) {
        super(request, h)
    }
}

module.exports = function(request, h) {
    return new userLoginHandler(request, h).getResult();
}
