const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/school/',
        method: 'POST',
        handler: Handlers.postSchool,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'required'
            },
            validate: Validators.postSchool,
            description: 'Create School',
            notes: 'New school signup api',
            tags: ['api', 'school'],
        },
    },
];