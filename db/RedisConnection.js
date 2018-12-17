const _redis = require('redis');
const { promisify } = require('util');

class Redis {

    constructor(redisConfig = null) {
        if (redisConfig)
            this.client = _redis.createClient(redisConfig);
        else
            this.client = _redis.createClient(); // default config for local unauthenticated redis
    }

    get() {
        return promisify(this.client.get).bind(this.client);
    }

    set() {
        return promisify(this.client.set).bind(this.client);
    }

    static getInstance(redisConfig = null) {
        return (Redis.instance == null) ? Redis.instance = new Redis(redisConfig) : Redis.instance;
    }

}

module.exports = Redis.getInstance;
