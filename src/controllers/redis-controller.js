import redisService from "../services/redis-service.js";

const get = async (req, res, next) => {
    try {
        const result = await redisService.get()
        res.status(200).json({
            data: result,
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const set = async (req, res, next) => {
    try {
        const result = await redisService.set()
        res.status(200).json({
            data: result,
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

export default {
    get,
    set
}