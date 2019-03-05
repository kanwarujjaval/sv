const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/batch/',
        method: 'POST',
        handler: Handlers.postBatch,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'required'
            },
            validate: Validators.postBatch,
            description: 'Create Batch',
            notes: 'New Batch api',
            tags: ['api', 'batch'],
        },
    },
];