const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/subject/',
        method: 'POST',
        handler: Handlers.postSubject,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'required'
            },
            validate: Validators.postSubject,
            description: 'Create Subject',
            notes: 'New subject api',
            tags: ['api', 'subject'],
        },
    },
];