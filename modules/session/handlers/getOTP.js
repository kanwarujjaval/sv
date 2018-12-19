const Handler = require('./../../../classes/Handler');
const SessionManager = require('./../lib/SessionManager');
const Boom = require('boom');

class getOTPHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.sessionManager = new SessionManager();
        this.user = null;
        this.OTP = null;
    }

    async checkUserExists() {
        let phoneNumber = this.request.query.phoneNumber;
        let user = await this.h.sql.query`SELECT *
                                          FROM users
        WHERE phone_number = ${phoneNumber}`;
        try {
            this.user = user.recordsets[0][0].id ? user.recordsets[0][0] : null;
        } catch (e) {
            throw Boom.forbidden('Phone Number is not in the system');
        }
    }

    generateOTP() {
        this.OTP = Math.floor(100000 + Math.random() * 9000);
    }

    sendOTP() {
        // attach a sender and send this.OTP
    }

    async setSession() {
        let session = {
            otp: this.OTP,
            userId: this.user.id,
            phoneNumber: this.user.phone_number
        };
        session = await this.sessionManager.addSession(session);
        return session;
    }

    async makeResult() {
        await this.checkUserExists();
        this.generateOTP();
        this.sendOTP();
        let session = await this.setSession();
        // this.sessionManager.addSession(this.user);
        this.result = {
            token: session.id,
            otp: this.OTP       // only for testing, does not go on production
        }
    }

}

module.exports = function (request, h) {
    return new getOTPHandler(request, h).getResult();
};
