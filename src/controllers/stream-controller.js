import streamService from "../services/stream-service.js";
import logMiddleware from "../middleware/log-middleware.js";

const stream = async (req, res, next) => {
    try {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        });
        await streamService.stream(res)
        res.end("streaming ended")
        req.destroy()
        return logMiddleware.logResponse(res, 200, {
            date: "streaming ended",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

export default {
    stream
}