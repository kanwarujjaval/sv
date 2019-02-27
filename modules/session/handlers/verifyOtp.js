const Boom = require('boom');
const Handler = require('./../../../classes/Handler');
const SessionManager = require('./../lib/SessionManager');

class getOTPHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.intent = this.request.query.intent;
        this.sessionId = this.request.query.uid;
        this.sessionManager = new SessionManager(this.intent, this.sessionId);
        this.session = null;
        this.user = null;
    }

    async getSession() {
        this.session = await this.sessionManager.getSession();
        if (!this.session || !this.session.otp) {
            throw Boom.forbidden('OTP expired');
        }
    }

    async verifyOtp() {
        if (Number(this.session.otp) !== Number(this.request.query.otp)) {
            throw Boom.forbidden('Invalid OTP');
        }
        if (this.intent !== this.session.intent) {
            throw Boom.forbidden('Invalid Session Intent');
        }
    }

    async checkUserExists() {
        let phoneNumber = this.session.phoneNumber;
        let [user] = await this.h.sql.query(this.h.parse`SELECT *
                                                         FROM user
        WHERE phoneNumber = ${phoneNumber}`);
        try {
            this.user = user[0].id ? user[0] : null;
        } catch (e) {
            throw Boom.forbidden('Phone Number is not in the system');
        }
    }

    async makeResult() {
        await this.getSession();
        await this.verifyOtp();
        if (this.intent === 'LOGIN') {
            await this.checkUserExists();
            this.sessionManager.addKeys('userId', this.user.id);
        }
        let verified = await this.sessionManager.validateSession();
        let token = this.sessionManager.getToken();
        this.result = {
            verified: verified,
            token: token
        }
    }

}

module.exports = function (request, h) {
    return new getOTPHandler(request, h).getResult();
};
