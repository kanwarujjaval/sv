const Joi = require('joi');

const schema = Joi.object().keys({
    id: Joi.number(),
    userId: Joi.number(),
    isActive: Joi.number(),
    ipaddress: Joi.number(),
    deviceType: Joi.string(),
    deviceId: Joi.string(),
    createdAt: Joi.string(),
    destroyedAt: Joi.string()
}).with('deviceType', 'deviceId');

module.exports = schema;
