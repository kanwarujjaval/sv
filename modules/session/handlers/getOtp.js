const Handler = require('./../../../classes/Handler');
const SessionManager = require('./../lib/SessionManager');

class getOTPHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.sessionManager = new SessionManager();
        this.user = null;
        this.OTP = null;
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
            phoneNumber: this.user.phoneNumber,
            intent: this.intent
        };
        session = await this.sessionManager.addSession(session);
        return session;
    }

    async makeResult() {
        this.generateOTP();
        this.sendOTP();
        let session = await this.setSession();
        this.result = {
            token: session.id,
            otp: this.OTP // only for testing, does not go on production
        }
    }

}

module.exports = function(request, h) {
    return new getOTPHandler(request, h).getResult();
};
