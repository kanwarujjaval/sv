const Handler = require('./../../../classes/Handler');
const SessionManager = require('./../lib/SessionManager');
const Boom = require('boom');

class getOTPHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.intent = this.request.query.intent;
        this.phoneNumber = this.request.query.phoneNumber;
        this.OTP = this.generateOTP();
        this.sessionManager = new SessionManager(this.intent);
    }

    generateOTP() {
        return Number((Math.floor(100000 + Math.random() * 99999999999) + '').substring(0,6));
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
        if(this.intent === "LOGIN"){
            let [user] = await this.h.sql.query(this.h.parse`SELECT id FROM user WHERE phoneNumber = ${this.phoneNumber}`);
            if(!user[0] || !user[0].id){
                throw Boom.forbidden('Phone Number is not in the system');
            }
        }
        this.sendOTP();
        let session = await this.createSession();
        this.result = {
            uid: session.id,
            otp: this.OTP // only for testing, does not go on production
        }
    }

}

module.exports = function (request, h) {
    return new getOTPHandler(request, h).getResult();
};
