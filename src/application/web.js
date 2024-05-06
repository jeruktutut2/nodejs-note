import express from "express";
import { publicRouter } from "../routes/public-api.js";
import { privateRouter } from "../routes/private-api.js";
import middleware from "../middleware/exception-middleware.js";
import cookieParser from "cookie-parser";
import requestIdMiddleware from "../middleware/request-id-middleware.js";
import logMiddleware from "../middleware/log-middleware.js";
import timeoutMiddleware from "../middleware/timeout-middleware.js";

const cookieSecret = process.env.COOKIE_SECRET

export const web = express()
web.use(express.json())
web.use(cookieParser(cookieSecret))
// web.use(timeoutMiddleware.setTimeout)
web.use(requestIdMiddleware.setRequestId)
web.use(logMiddleware.setLogRequest)
web.use(publicRouter)
web.use(privateRouter)
web.use(middleware.exceptionMiddleware)