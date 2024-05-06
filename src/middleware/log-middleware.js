const setLog = async (req, res, next) => {
    console.log("awal");
    next()
    console.log("akhir");
}

const setLogRequest = async (req, res, next) => {
    const requestLog = {requestTime: new Date() , method: req.method ,requestId: req.requestId, host: req.headers.host, urlPath: req.originalUrl, protocol: req.protocol, body: JSON.stringify(req.body) , userAgent: req.get('User-Agent'), remoteAddr: req.socket.remoteAddress, forwardedFor: req.headers['x-forwarded-for'], headers: JSON.stringify(req.headers)}
    console.log(JSON.stringify(requestLog))
    next()
}

const setLogResponse = async (req, res, next) => {
    console.log("response");
    next()
}

export default {
    setLog,
    setLogRequest,
    setLogResponse
}