const Boom = require('boom');
const uuid = require('uuid/v4');
const Redis = require('./../../../db/RedisConnection');

class SessionManager {

    constructor() {
        this.sessions = new Map();
        this.redis = Redis();
    }

    async addSession(session) {
        let id = uuid();
        this.sessions.set(id, session);
        let ttl = 900;   // 15 minutes
        await this.redis.hmset(id, session);
        this.redis.expire(id, ttl);
        session.id = id;
        return session;
    }

    async verifySession(sessionId, otp) {
        let ttl = 2592000;   // 30 days
        let otpForSession = await this.redis.hmget(sessionId, "otp");
        if (!otpForSession || !(Number(otpForSession) === Number(otp))) {
            throw Boom.forbidden('Invalid OTP');
        }
        this.redis.hdel(sessionId, "otp");
        this.redis.expire(sessionId, ttl);
        return true;
    }

    deleteSession(sessionId) {
        this.redis.del(sessionId);
    }

    persisSessionsToLogs() {
        //todo
    }

}

module.exports = SessionManager;
