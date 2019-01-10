const Boom = require('boom');
const uuid = require('uuid/v4');
const Redis = require('./../../../db/RedisConnection');

class SessionManager {

    constructor(intent) {
        this.intent = intent; // set the session intent
        this.redis = Redis();
    }

    async addSession(session) {
        let id = uuid();
        let ttl = 900; // 15 minutes
        session.id = id;
        await this.redis.hmset(id, session);
        this.redis.expire(id, ttl);
        session.id = id;
        return session;
    }

    async verifySession(sessionId, otp, currentIntent) {
        let ttl = 2592000; // 30 days
        let session = await await this.redis.hgetall(sessionId);
        if (!session.otp || !(Number(session.otp) === Number(session.otp))) {
            throw Boom.forbidden('Invalid OTP');
        }
        if (this.intent != currentIntent) {
            throw Boom.forbidden('Invalid Session Intent');
        }
        this.redis.hdel(sessionId, "otp");
        this.redis.expire(sessionId, ttl);
        return true;
    }

    async getSession(sessionId) {
        return await this.redis.hgetall(sessionId);
    }

    deleteSession(sessionId) {
        this.redis.del(sessionId);
    }

    persistSessionsToLogs() {
        //todo
    }

}

module.exports = SessionManager;
