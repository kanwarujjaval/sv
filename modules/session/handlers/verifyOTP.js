const Handler = require('./../../../classes/Handler');
const SessionManager = require('./../lib/SessionManager');

class getOTPHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.sessionManager = new SessionManager();
        this.jwt = null;
    }

    async verifyOtp() {
        let otp = this.request.query.otp;
        let sessionId = this.request.query.uid;
        this.jwt = await this.sessionManager.verifySession(sessionId, otp);
    }

    async makeResult() {
        await this.verifyOtp();
        this.result = {
            token: this.jwt    // only for testing, does not go on production
        }
    }

}

module.exports = function (request, h) {
    return new getOTPHandler(request, h).getResult();
};
