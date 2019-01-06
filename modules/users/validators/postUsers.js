const Joi = require('joi');
module.exports = {
    payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email(),
        phoneNumber: Joi.number().min(9).required(),
        country: Joi.string().max(2),
        password: Joi.string().min(8)
    },
    headers: {
        authorization: Joi.string()
    }
};
