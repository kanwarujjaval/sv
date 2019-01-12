const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/users/',
        method: 'POST',
        handler: Handlers.postUsers,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'required',
                scope: ['SIGNUP', 'SUPER_ADMIN', 'SCHOOL_STAFF', 'SCHOOL_ADMIN']
            },
            validate: Validators.postUsers,
            description: 'Create User',
            notes: 'New user signup api',
            tags: ['api', 'user'],
        },
    },
];