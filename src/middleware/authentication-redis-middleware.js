import redisApp from "../application/redis.js";

const authenticationRedis = async (req, res, next) => {
    const authentication = req.signedCookies["Authorization"]
    if (!authentication) {
        res.status(401).json({
            data: "",
            error: "unauthorized"
        })
        return
    }
    const user = await redisApp.redis.get("Authorization")
    if (!user) {
        res.status(401).json({
            data: "",
            error: "unauthorized"
        })
        return
    }
    req.user = JSON.parse(user)
    next()
}

export default {
    authenticationRedis
}