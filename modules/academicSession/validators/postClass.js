const Joi = require('joi');
module.exports = {
    payload: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string(),
        pincode: Joi.number()
    },
    headers: Joi.object({authorization: Joi.string().optional()}).unknown()
};
