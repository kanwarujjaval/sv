const Handler = require('./../../../classes/Handler');

class UserLoginHandler extends Handler {
    
    constructor(request, h) {
        super(request, h)
    }
    
    
}

module.exports = function(request, h) {
    return new UserLoginHandler(request, h).getResult();
};
