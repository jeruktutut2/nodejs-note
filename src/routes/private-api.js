import express from "express";
import userController from "../controllers/user-controller.js";
import authenticationMiddleware from "../middleware/authentication-middlewre.js";
import permissionMiddleware from "../middleware/permission-middleware.js";
import expressFileUpload from "express-fileupload";
import fileUploadController from "../controllers/file-upload-controller.js";
import bookController from "../controllers/book-controller.js";

const privateRouter = new express.Router()
privateRouter.use(expressFileUpload())
privateRouter.use(authenticationMiddleware.authentication)
privateRouter.post("/api/v1/check-authentication", userController.checkAuthenticated)
privateRouter.get("/api/v1/check-permission/1", permissionMiddleware.permission1, userController.checkPermission1)
privateRouter.post("/api/v1/upload-file", fileUploadController.uploadFile)
privateRouter.post("/api/v1/book", bookController.create)
privateRouter.get("/api/v1/book/:id", bookController.findById)
privateRouter.get("/api/v1/book", bookController.findMany)
privateRouter.patch("/api/v1/book", bookController.updateName)
privateRouter.put("/api/v1/book", bookController.update)
privateRouter.delete("/api/v1/book", bookController.deleteBook)
privateRouter.patch("/api/v1/user", userController.changeUsername)
privateRouter.patch("/api/v1/user/change-password", userController.changePassword)
privateRouter.get("/api/v1/permission/check-permission", permissionMiddleware.checkPermission, userController.checkPermission1)

export {
    privateRouter
}