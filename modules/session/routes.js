const Joi = require('joi');
const Validator = require('./validator');

module.exports = [
    {
        path: '/api/v1/user/login',
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
            },
            validate: {
                payload: Validator.user.login,
                failAction: function (request, reply, source, error) {
                    let customErrorMessage = '';
                    if (error.output.payload.message.indexOf('[') > -1) {
                        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf('['));
                    } else {
                        customErrorMessage = error.output.payload.message;
                    }
                    customErrorMessage = customErrorMessage.replace(/"/g, '');
                    customErrorMessage = customErrorMessage.replace('[', '');
                    customErrorMessage = customErrorMessage.replace(']', '');
                    error.output.payload.message = customErrorMessage;
                    delete error.output.payload.validation;
                    error.output.payload.data = {};
                    return reply(error);
                }
            }
        }
    }
];