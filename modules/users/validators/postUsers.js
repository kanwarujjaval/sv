const Joi = require('joi');
module.exports = {
    payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email(),
        phoneNumber: Joi.string().min(9).required(),
        password: Joi.string()
    },
    headers: Joi.object({authorization: Joi.string().optional()}).unknown()
};
