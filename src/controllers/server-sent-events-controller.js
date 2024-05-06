import EventEmitter from "events";

let clients = []

const handleSSE = async (req, res, next) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);

    const clientId = Date.now()
    const newClient = {
        id: clientId,
        res
    }
    clients.push(newClient)

    req.on('close', () => {
        console.log(clientId + " Connection closed");
        clients = clients.filter(client => client.id !== clientId);
        res.end("stream is ended")
    });
}

const status = async (req, res, next) => {
    try {
        const clientIds = []
        clients.forEach(client => {
            clientIds.push(client.id)
        });
        res.status(200).json({
            date: clientIds,
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const sendMessage = async (req, res, next) => {
    try {
        const message = req.params.message
        clients.forEach(client => {
            client.res.write(message + "\n")
        });
        res.status(200).json({
            data: message,
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

export default {
    handleSSE,
    status,
    sendMessage
}