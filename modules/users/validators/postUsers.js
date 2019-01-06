const Joi = require('joi');
module.exports = {
    payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email(),
        phoneNumber: Joi.string().min(9).required(),
        password: Joi.string().min(8)
    },
    headers: Joi.object({authorization: Joi.string().token().optional()}).unknown()
};
