const Joi = require('joi');
module.exports = {
    payload: {
        name: Joi.string().required(),
        section: Joi.string(),
    },
    headers: Joi.object({authorization: Joi.string().optional()}).unknown()
};
