import Redis from "ioredis";

let redis = null
const newConnection = async () => {
    redis = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: process.env.REDIS_DATABASE
    })
    console.log(new Date(Date.now()).toISOString(), "redis: connected");
    console.log(new Date(Date.now()).toISOString(), "redis: ", await redis.ping());

    return redis
}

export default {
    redis,
    newConnection
}