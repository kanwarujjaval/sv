const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/session/otp',
        method: 'GET',
        handler: Handlers.getOTP,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            },
            validate: Validators.getOTP,
            description: 'Get OTP',
            notes: 'Get OTP for a new Login',
            tags: ['api', 'session'],
        },
    },
];