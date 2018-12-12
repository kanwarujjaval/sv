const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/login',
        method: 'POST',
        handler: Handlers.userLogin,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            },
            validate: Validators.userLogin,
            description: 'Create a new session',
            notes: 'Create a new session for a user.',
            tags: ['api', 'session'],
        },
    }
];