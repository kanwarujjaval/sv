const Joi = require('joi');
const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers')

module.exports = [
    {
        path: '/api/v1/session',
        method: 'POST',
        handler: Handlers.userLogin,
        options:{
            validate:Validators.userLogin,
        },
    }
];