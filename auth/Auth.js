const hapiAuthJWT = require('hapi-auth-jwt2');
const JWT = require('jsonwebtoken');

class Auth {
    constructor(server) {
        this.server = server;
    }

    async registerAuth() {
        await this.server.register(hapiAuthJWT);

        this.server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT || 'randomkey',
            validate: this.validate,
            verifyOptions: {algorithms: ['HS256']}
        });
        this.server.auth.default('jwt');
    }

    validate(decoded, request, cb) {
        if (decoded) {
            return cb(null, true);
        }
    }

    static createToken(data) {
        return JWT.sign(data, process.env.JWT_SECRET);
    }
}

module.exports = Auth;
