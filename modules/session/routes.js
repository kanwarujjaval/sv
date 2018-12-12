const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/session',
        method: 'POST',
        handler: Handlers.userLogin,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'required'
            },
            validate: Validators.userLogin,
            description: 'Create a new session',
            notes: 'Create a new session for a user. Equivalent to a login API',
            tags: ['api', 'session'],
        },
    }
];