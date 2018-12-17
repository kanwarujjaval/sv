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
        let user = await this.h.sql.query `SELECT * FROM users WHERE phone_number = ${phoneNumber}`;
        user = user.recordsets[0].id ? user.recordsets[0] : null;
        if (!user)
            throw Boom.forbidden('Phone Number is not in the system');
    }

    generateOTP() {
        this.OTP = Math.floor(1000 + Math.random() * 9000);
    }

    sendOTP() {
        // attach a sender and send this.OTP
    }

    async makeResult() {
        this.generateOTP();
        this.sendOTP();
        await this.checkUserExists();
        // this.sessionManager.addSession(this.user);
        this.result = {
            otp: this.OTP       // only for testing, does not go on production
        }
    }

}
console.log("File required again");

module.exports = function(request, h) {
    return new getOTPHandler(request, h).getResult();
};
