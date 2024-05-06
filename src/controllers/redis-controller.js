import redisService from "../services/redis-service.js";
import logMiddleware from "../middleware/log-middleware.js";

const get = async (req, res, next) => {
    try {
        const result = await redisService.get()
        return logMiddleware.logResponse(res, 200, {
            data: result,
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const set = async (req, res, next) => {
    try {
        const result = await redisService.set()
        return logMiddleware.logResponse(res, 200, {
            data: result,
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

export default {
    get,
    set
}