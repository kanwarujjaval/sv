const Handler = require('./../../../classes/Handler');
const SessionManager = require('./../lib/SessionManager');

class getOTPHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.intent = this.request.query.intent;
        this.phoneNumber = this.request.query.phoneNumber;
        this.OTP = this.generateOTP();
        this.sessionManager = new SessionManager(this.intent);
    }

    generateOTP() {
        return Math.floor(100000 + Math.random() * 9000);
    }

    sendOTP() {
        // attach a sender and send this.OTP
    }

    async createSession() {
        let session = {
            otp: this.OTP,
            phoneNumber: this.phoneNumber,
        };
        session = await this.sessionManager.addSession(session);
        return session;
    }

    async makeResult() {
        this.sendOTP();
        let session = await this.createSession();
        let token = this.sessionManager.getToken();
        this.result = {
            token: token,
            sessionId: session.id,
            otp: this.OTP // only for testing, does not go on production
        }
    }

}

module.exports = function (request, h) {
    return new getOTPHandler(request, h).getResult();
};
