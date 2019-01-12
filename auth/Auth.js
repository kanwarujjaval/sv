const hapiAuthJWT = require('hapi-auth-jwt2');
const JWT = require('jsonwebtoken');
const redis = require('./../db/RedisConnection')();

class Auth {
    constructor(server) {
        this.server = server;
    }

    async registerAuth() {
        await this.server.register(hapiAuthJWT);

        this.server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT || 'temp_please_get_this_from_config_and_secret.json_file',
            validate: this.validate,
            verifyOptions: { algorithms: ['HS256'] }
        });
        this.server.auth.default('jwt');
    }

    async validate(decoded, request) {
        let session = await redis.hgetall(decoded);
        if (!session || !session.id || !Number(session.valid))
            return { isValid: false }
        session.scope = [];
        if (session.valid) {
            switch (session.intent) {
                case 'LOGIN':
                    session.scope.push(session.role)
                    break;
                case 'SIGNUP':
                    session.scope = ['SIGNUP']
                    break;
            }
        }
        return {
            isValid: true,
            credentials: session
        };
    };

    static createToken(data) {
        return JWT.sign(data, process.env.JWT || 'temp_please_get_this_from_config_and_secret.json_file');
    }
}

module.exports = Auth;
