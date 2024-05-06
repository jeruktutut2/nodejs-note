import EventEmitter from "events";
import eventEmitterService from "../services/event-emitter-service.js";

const channel = new EventEmitter()

const receiveMessage = async (req, res, next) => {
    try {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked'
        });

        await eventEmitterService.sendMessage(channel)
        
        channel.on('data', (data) => {
            res.write(data + '\n');
        });

        channel.once('emitselesai', () => {
            res.end('Streaming selesai\n');
        });
        return
    } catch (error) {
        next(error)
    }
}

export default {
    receiveMessage
}