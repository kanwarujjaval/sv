const Joi = require('joi');
const requireDir = require('./../../utils/Util').requireDir;
const Validator = requireDir('./validator');
console.log('----------------------');
console.log(Validator);

module.exports = [
    {
        path: '/api/v1/session',
        method: 'POST',
        handler: {
            'user.login': {}
        },
        config: {
            description: 'Login user',
            notes: 'User Login api',
            tags: ['api', 'user'],
            plugins: {
                'hapi-swagger': {
                    responses: Joi.object(),
                    payloadType: 'form'
                }
            }
        }
    }
];