import rabbitApp from "../application/rabbitmq.js";
const publish = async (req, res, next) => {
    try {
        const key = req.params.key
        const message = req.params.message
        rabbitApp.channel.publish("notification", key, Buffer.from(message), {
            headers: {
                "sample": "value"
            }
        })
        res.status(200).json({
            data: "successfully publish message",
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

export default {
    publish
}