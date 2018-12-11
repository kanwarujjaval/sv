const Joi = require('joi');
module.exports = {
    payload: {
        email: Joi.string().trim().email().lowercase()
      }
};