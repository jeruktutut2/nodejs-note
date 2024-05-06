import timeoutService from "../services/timeout-service.js";

const checkTimeout = async (req, res, next) => {
    try {
        const result = await timeoutService.checkTimeout()
        if (!req.isTimeout) {
            res.status(200).json({
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