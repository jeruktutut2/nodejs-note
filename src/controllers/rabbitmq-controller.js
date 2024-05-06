import rabbitApp from "../application/rabbitmq.js";
import logMiddleware from "../middleware/log-middleware.js";
const publish = async (req, res, next) => {
    try {
        const key = req.params.key
        const message = req.params.message
        rabbitApp.channel.publish("notification", key, Buffer.from(message), {
            headers: {
                "sample": "value"
            }
        })
        return logMiddleware.logResponse(res, 200, {
            data: "successfully publish message",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

export default {
    publish
}