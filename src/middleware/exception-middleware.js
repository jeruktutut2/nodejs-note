import { ZodError } from "zod";
import { ResponseException } from "../exception/response-exception.js";
import { ValidationException } from "../exception/validation-exception.js";

const exceptionMiddleware = async (err, req, res, next) => {
    if (!err) {
        next()
        return
    }
    console.log("err:", err);
    if (err instanceof ResponseException) {
        res.status(err.status).json({
            data: "",
            error: err.message
        }).end()    
    } else if (err instanceof ValidationException) {
        res.status(err.status).json({
            data: "",
            error: JSON.parse(err.message)
        }).end()
    } else if (err instanceof ZodError) {
        res.status(400).json({
            data: "",
            error: `validation error: ${JSON.stringify(err)}`
        }).end()    
    } else {
        res.status(500).json({
            data: "",
            error: "internal server error"
        }).end()
    }
}

export default {
    exceptionMiddleware
}