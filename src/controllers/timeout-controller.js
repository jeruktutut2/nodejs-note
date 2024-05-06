import timeoutService from "../services/timeout-service.js";
import logMiddleware from "../middleware/log-middleware.js";

const checkTimeout = async (req, res, next) => {
    try {
        const result = await timeoutService.checkTimeout()
        if (!req.isTimeout) {
            return logMiddleware.logResponse(res, 200, {
                data: result,
                error: ""
            })
        }
        return
    } catch (error) {
        next(error)
    }
}

const checkTimeoutWithTransaction = async (req, res, next) => {
    try {
        const result = timeoutService.checkTimeoutWithTransaction()
        res.status(200).json({
            data: "successfully timeout",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

export default {
    checkTimeout, 
    checkTimeoutWithTransaction
}