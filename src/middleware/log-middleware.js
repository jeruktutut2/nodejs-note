const setLogRequest = async (req, res, next) => {
    const requestLog = {requestTime: new Date() , method: req.method, requestId: req.requestId, host: req.headers.host, urlPath: req.originalUrl, protocol: req.protocol, body: JSON.stringify(req.body) , userAgent: req.get('User-Agent'), remoteAddr: req.socket.remoteAddress, forwardedFor: req.headers['x-forwarded-for'], headers: JSON.stringify(req.headers)}
    console.log(JSON.stringify(requestLog))
    next()
}

const logResponse = async (res, httpCode, response) => {
    const resp = JSON.stringify({responseTime: new Date, response: response})
    console.log(resp);
    res.status(httpCode).json(response)
}

export default {
    setLogRequest,
    logResponse
}