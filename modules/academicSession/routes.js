const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/academicSession/class',
        method: 'POST',
        handler: Handlers.postClass,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'required'
            },
            validate: Validators.postClass,
            description: 'Create a new class',
            notes: 'New class api',
            tags: ['api', 'academicSession'],
        },
    },
];