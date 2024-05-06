import kafkaApp from "../application/kafka.js";
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
        res.status(200).json({
            data: "successfully publish email",
            error: ""
        })
        return
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
        res.status(200).json({
            data: "successfully publish text message",
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

export default {
    publishEmail,
    publishTextMessage
}