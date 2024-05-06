import { ResponseException } from "../exception/response-exception.js";

const setTimeout = (req, res, next) => {
    req.isTimeout = false
    res.setTimeout(3000, () => {
        req.isTimeout = true
        const err = new ResponseException(408, "request timeout")
        next(err)
    });
    next()
}

export default {
    setTimeout
}