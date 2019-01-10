const Joi = require('joi');
module.exports = {
    query: {
        phoneNumber: Joi.number().required(),
        intent: Joi.string().valid(['SIGNUP', 'LOGIN']).required()
    }
};
