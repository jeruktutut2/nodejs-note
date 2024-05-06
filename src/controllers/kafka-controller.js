import kafkaApp from "../application/kafka.js";
import logMiddleware from "../middleware/log-middleware.js";

const publishEmail = async (req, res, next) => {
    try {
        const message = req.params.message
        await kafkaApp.producer.send({
            topic: "email",
            messages: [
                {
                    value: message
                }
            ]
        })
        return logMiddleware.logResponse(res, 200, {
            data: "successfully publish email",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const publishTextMessage = async (req, res, next) => {
    try {
        const message = req.params.message
        await kafkaApp.producer.send({
            topic: "text-message",
            messages: [
                {
                    value: message
                }
            ]
        })
        return logMiddleware.logResponse(res, 200, {
            data: "successfully publish text message",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

export default {
    publishEmail,
    publishTextMessage
}