const Joi = require('joi');
module.exports = {
    headers: Joi.object({authorization: Joi.string().optional()}).unknown()
};
