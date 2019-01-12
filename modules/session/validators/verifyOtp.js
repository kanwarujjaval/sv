const Joi = require('joi');
module.exports = {
    query: {
        otp: Joi.number().min(100000).max(999999).required(),
        uid: Joi.string().uuid().required(),
        intent: Joi.string().valid(['SIGNUP', 'LOGIN']).required()
    },
    // headers: Joi.object({ authorization: Joi.string().optional() }).unknown()
};
