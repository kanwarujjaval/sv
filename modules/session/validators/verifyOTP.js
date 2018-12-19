const Joi = require('joi');
module.exports = {
    query: {
        otp: Joi.number().min(6).required(),
        uid: Joi.string().uuid().required()
    }
};
