import redisApp from "../application/redis.js";

const get = async () => {
    return await redisApp.redis.get("key")
}

const set = async () => {
    return await redisApp.redis.set("key", "value")
}

export default {
    get,
    set
}