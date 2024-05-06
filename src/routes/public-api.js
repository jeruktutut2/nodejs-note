import express from "express";
import userController from "../controllers/user-controller.js";
import timeoutController from "../controllers/timeout-controller.js";
import eventEmitterController from "../controllers/event-emitter-controller.js";
import serverSentEventsController from "../controllers/server-sent-events-controller.js";
import streamController from "../controllers/stream-controller.js";
import redisController from "../controllers/redis-controller.js";
import rabbitmqController from "../controllers/rabbitmq-controller.js";
import timeoutMiddleware from "../middleware/timeout-middleware.js";
import kafkaController from "../controllers/kafka-controller.js";
import authenticationMiddleware from "../middleware/authentication-middlewre.js";
import authenticationRedisMiddleware from "../middleware/authentication-redis-middleware.js";
import authenticationMapMiddleware from "../middleware/authentication-map-middleware.js";
import permissionMiddleware from "../middleware/permission-middleware.js";
import pdfController from "../controllers/pdf-controller.js";

const publicRouter = new express.Router()
publicRouter.post("/api/v1/user/register", userController.register)
publicRouter.post("/api/v1/user/login", userController.login)
publicRouter.post("/api/v1/user/refresh-token", authenticationMiddleware.authentication, userController.refreshToken)
publicRouter.post("/api/v1/user/login-redis", userController.loginRedis)
publicRouter.get("/api/v1/user/check-login-redis", authenticationRedisMiddleware.authenticationRedis, userController.checkLoginRedis)
publicRouter.post("/api/v1/user/login-map", userController.loginMap)
publicRouter.get("/api/v1/user/check-login-map", authenticationMapMiddleware.authenticationMap, userController.checkLoginMap)
publicRouter.post("/api/v1/user/logout", userController.logout)
publicRouter.post("/api/v1/user/logout-redis", authenticationRedisMiddleware.authenticationRedis, userController.logoutRedis)
publicRouter.post("/api/v1/user/logout-map", authenticationMapMiddleware.authenticationMap, userController.logoutMap)
publicRouter.get("/check-timeout", timeoutMiddleware.setTimeout, timeoutController.checkTimeout)
publicRouter.get("/check-timeout-with-transaction", timeoutController.checkTimeoutWithTransaction)
publicRouter.get("/api/v1/event-emitter/receive-message", eventEmitterController.receiveMessage)
publicRouter.get("/api/v1/sse/handle-sse-without-channel", serverSentEventsController.handleSSE)
publicRouter.get("/api/v1/sse/status", serverSentEventsController.status)
publicRouter.get("/api/v1/sse/send-message-without-channel/:message", serverSentEventsController.sendMessage)
publicRouter.get("/api/v1/stream-with-sse", streamController.stream)
publicRouter.get("/redis/get", redisController.get)
publicRouter.get("/redis/set", redisController.set)
publicRouter.get("/api/v1/rabbitmq/push-message/:key/:message", rabbitmqController.publish)
publicRouter.get("/api/v1/kafka/email/:message", kafkaController.publishEmail)
publicRouter.get("/api/v1/kafka/text-message/:message", kafkaController.publishTextMessage)
publicRouter.get("/api/v1/permission/check-permission", authenticationMapMiddleware.authenticationMap, permissionMiddleware.checkPermission, userController.checkPermission1)
publicRouter.get("/api/v1/permission/check-nopermission", authenticationMapMiddleware.authenticationMap, permissionMiddleware.checkNopermission, userController.checkPermission1)
publicRouter.get("/api/v1/pdf", pdfController.generatePdf)

export {
    publicRouter
}