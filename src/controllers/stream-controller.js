import streamService from "../services/stream-service.js";

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
        return
    } catch (error) {
        next(error)
    }
}

export default {
    stream
}