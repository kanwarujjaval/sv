const Boom = require('boom');
const Handler = require('./../../../classes/Handler');
const SessionManager = require('./../lib/SessionManager');

class getOTPHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.sessionManager = new SessionManager();
        this.jwt = null;
        this.phoneNumber = null;
        this.sessionId = this.request.query.uid;
        this.session = this.sessionStorage.getSession(this.sessionId);
    }

    async checkUserExists() {
        let phoneNumber = this.session.phoneNumber;
        let [user] = await this.h.sql.query(this.h.parse `SELECT * FROM user WHERE phoneNumber = ${phoneNumber}`);
        try {
            this.user = user[0].id ? user[0] : null;
        }
        catch (e) {
            throw Boom.forbidden('Phone Number is not in the system');
        }
    }

    async verifyOtp() {
        this.otp = this.request.query.otp;
        this.intent = this.request.query.intent;
        this.jwt = await this.sessionManager.verifySession(this.sessionId, this.otp, this.intent);
        this.phoneNumber = null;
    }

    async makeResult() {
        await this.verifyOtp();
        await this.checkUserExists;
        this.result = {
            token: this.jwt // only for testing, does not go on production
        }
    }

}

module.exports = function(request, h) {
    return new getOTPHandler(request, h).getResult();
};
