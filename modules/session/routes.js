const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/session/otp',
        method: 'GET',
        handler: Handlers.getOtp,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            },
            validate: Validators.getOtp,
            description: 'Get OTP',
            notes: 'Get OTP for a new Session',
            tags: ['api', 'session'],
        },
    }, {
        path: '/api/v1/session/otp/verify',
        method: 'GET',
        handler: Handlers.verifyOtp,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional',
            },
            validate: Validators.verifyOtp,
            description: 'Verify OTP',
            notes: 'Verify OTP for a new Session',
            tags: ['api', 'session'],
        },
    },
];