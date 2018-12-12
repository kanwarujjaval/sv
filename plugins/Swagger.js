const HapiSwagger = require('hapi-swagger');
const pack = require('./../package');

const swaggerOptions = {
    info: {
        title: `Docs`,
        version: pack.version
    },
    basePath: '/api/v1/',
    pathPrefixSize: 3
};


module.exports = {
    name: 'hapi-swagger',
    plugin: {
        register: HapiSwagger,
        options: swaggerOptions
    }
};
