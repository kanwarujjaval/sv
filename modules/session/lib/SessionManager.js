const Boom = require('boom');
const uuid = require('uuid/v4');
const Redis = require('./../../../db/RedisConnection');
const sessionObjectSchema = require('../validators/sessionObjectSchema');
const Auth = require('./../../../auth/Auth');

class SessionManager {

    constructor(intent, sessionId) {
        if (!intent) {
            throw Boom.internal('invalid session construction');
        }
        this.redis = Redis();
        this.intent = intent; // set the session intent
        this.sessionId = sessionId || uuid(); //set the sessionId
        this.session = {
            id: this.sessionId,
            intent: this.intent
        }; // session placeholder
    }

    async validateSessionObject() {
        await sessionObjectSchema.validate(this.session);
    }

    async addSession(session) {
        Object.assign(this.session, session);
        this.session.valid = 0; // by default new sessions are invalid to prevent login
        await this.validateSessionObject();
        await this.redis.hmset(this.sessionId, this.session);
        let ttl = 900; // 15 minutes
        this.redis.expire(this.sessionId, ttl);
        return this.session;
    }

    async validateSession() {
        let ttl = 86400; // 1 days for signup
        if (this.intent === 'LOGIN') {
            let ttl = 2592000; // 30 days for a logged in user
        }
        this.redis.hdel(this.sessionId, "otp");
        this.redis.hmset(this.sessionId, "valid", 1);
        this.redis.expire(this.sessionId, ttl);
    }

    async addUser(user) {
        await this.redis.hmset(this.sessionId, 'user', user)
    }

    getToken() {
        return Auth.createToken(this.sessionId);
    }

    async getSession() {
        return this.redis.hgetall(this.sessionId);
    }

    deleteSession(sessionId) {
        this.redis.del(sessionId);
    }

    persistSessionsToLogs() {
        //todo
    }

}

module.exports = SessionManager;
