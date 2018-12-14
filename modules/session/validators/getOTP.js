const Joi = require('joi');
module.exports = {
    query: {
        phoneNumber: Joi.number().min(9).required()
    }
};
