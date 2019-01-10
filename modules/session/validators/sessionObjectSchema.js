const Joi = require('joi');

const schema = Joi.object().keys({
    id: Joi.string().uuid(),
    intent: Joi.string().valid(['LOGIN', 'SIGNUP']).required(),
    otp: Joi.number().min(100000).max(999999),
    phoneNumber: Joi.number(),
    userId: Joi.number(),
    valid: Joi.number().valid([0, 1]),
    ipaddress: Joi.number(),
    deviceType: Joi.string(),
    deviceId: Joi.string(),
    createdAt: Joi.string(),
    destroyedAt: Joi.string()
}).with('deviceType', 'deviceId');

module.exports = schema;
