module.exports = {
    email: Joi.string().trim().email().lowercase()
        .description('REQUIRED email id, valid email format, auto trims whitespaces')
};