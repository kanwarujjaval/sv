const Boom = require('boom');
const uuid = require('uuid/v4');
const Redis = require('./../../../db/RedisConnection');
const sessionObjectSchema = require('../validators/sessionObjectSchema');
const Auth = require('./../../../auth/Auth');

class SessionManager {

    /**
     * Returns Session object for a given sessionId
     * Creates new session if sessionId is not given
     * @param intent @required
     * @param sessionId
     */
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

    /**
     * Session schema validator from validators/sessionObjectSchema
     * @returns {Promise<void>}
     */
    async validateSessionObject() {
        await sessionObjectSchema.validate(this.session);
    }

    /**
     * Adds a new session
     * A new session may be created for a given intent Login/Signup
     * Session only lives for 15 minutes unless validated
     * @param session
     * @returns {Promise<{id: (*|string), intent: *}|*>}
     */
    async addSession(session) {
        Object.assign(this.session, session);
        this.session.valid = 0; // by default new sessions are invalid to prevent login
        await this.validateSessionObject();
        await this.redis.hmset(this.sessionId, this.session);
        let ttl = 900; // 15 minutes
        this.redis.expire(this.sessionId, ttl);
        return this.session;
    }

    /**
     * Sets session.valid = 1
     * Increases session Time To Live to 30 days
     * If the login was done successfully
     * @returns {Promise<void>}
     */
    async validateSession() {
        let ttl = 86400; // 1 days for signup
        if (this.intent === 'LOGIN') {
            let ttl = 2592000; // 30 days for a logged in user
        }
        this.redis.hdel(this.sessionId, "otp");
        this.redis.hmset(this.sessionId, "valid", 1);
        this.redis.expire(this.sessionId, ttl);
    }

    /**
     * Add keys to given session in redis
     * @param key
     * @param value
     * @returns {Promise<void>}
     */
    async addKeys(key, value) {
        await this.redis.hmset(this.sessionId, key, value)
    }

    /**
     * Get
     * @returns {string} jsonwebtoken
     */
    getToken() {
        return Auth.createToken(this.sessionId);
    }

    /**
     * Get complete session data
     * @returns {Promise<{session: (*|object)}|*>}
     */
    async getSession() {
        return this.redis.hgetall(this.sessionId);
    }

    /**
     * delete session from redis
     * @param sessionId
     */
    deleteSession(sessionId) {
        this.redis.del(sessionId);
    }

    /**
     * @todo
     * Persists sessions to disk for memory failsafe
     */
    persistSessionsToLogs() {
    }

}

module.exports = SessionManager;
