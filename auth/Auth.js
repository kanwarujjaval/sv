var hapiAuthJWT = require('hapi-auth-jwt2');
var JWT = require('jsonwebtoken');

class Auth {
    constructor() {
        this.server = null;
        this.options = null;
        this.next = null;
    }

    load() {
        return function(server, options, next) {
            this.server = server;
            this.options = options;
            this.next = next;
            this.server.register(hapiAuthJWT, this.registerAuth);
        }
    }
    
    getPlugin(){
        return {
            register: this.load.call(this),
            name: 'auth-jwt',
        };
    }

    registerAuth(err) {
        if (err) {
            return this.next(err);
        }
        this.server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT || 'randomkey',
            validateFunc: this.validate,
            verifyOptions: { algorithms: ['HS256'] }
        });
        this.server.auth.default('jwt');
        return this.next();
    }

    validate(decoded, request, cb) {
        if (decoded) {
            return cb(null, true);
        }
    }

    static createToken(data){
        return JWT.sign(data, process.env.JWT_SECRET);
    }
}

module.exports = Auth;
