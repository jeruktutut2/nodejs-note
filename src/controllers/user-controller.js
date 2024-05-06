import userService from "../services/user-service.js";
import logMiddleware from "../middleware/log-middleware.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)
        return logMiddleware.logResponse(res, 201, {
            data: result,
            error: ""
        })
    } catch (error) {
        // console.log("error:", error);
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)
        res.cookie("Authorization", result.accessToken, { path: "/", signed: true, httpOnly: true})
        res.cookie("X-REFRESH-TOKEN", result.refreshToken, { path: "/", signed: true, httpOnly: true})
        return logMiddleware.logResponse(res, 201, {
            data: "successfully logged in",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const result = userService.refreshToken(req.user)
        res.cookie("Authorization", result.accessToken, { path: "/", signed: true, httpOnly: true})
        return logMiddleware.logResponse(res, 201, {
            data: "successfully logged in",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const loginRedis = async (req, res, next) => {
    try {
        const result = userService.loginRedis(req.body)
        res.cookie("Authorization", result, { path: "/", signed: true, httpOnly: true})
        return logMiddleware.logResponse(res, 201, {
            data: "successfully login redis",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const checkLoginRedis = async (req, res, next) => {
    try {
        return logMiddleware.logResponse(res, 200, {
            data: req.user,
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const loginMap = async (req, res, next) => {
    try {
        const result = await userService.loginMap(req.body)
        res.cookie("Authorization", result, { path: "/", signed: true, httpOnly: true})
        return logMiddleware.logResponse(res, 200, {
            data: "successfully login",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const checkLoginMap = async (req, res, next) => {
    try {
        return logMiddleware.logResponse(res, 200, {
            data: req.user,
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        res.cookie("Authorization", "", { path: "/", signed: true, httpOnly: true, maxAge: -1})
        return logMiddleware.logResponse(res, 200, {
            data: "successfully logout",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const logoutRedis = async (req, res, next) => {
    try {
        const result = await userService.logoutRedis(req.key)
        res.cookie("Authorization", "", { path: "/", signed: true, httpOnly: true, maxAge: -1})
        return logMiddleware.logResponse(res, 200, {
            data: "successfully logout",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const logoutMap = async (req, res, next) => {
    try {
        console.log("req.key:", req.key);
        const result = await userService.logoutMap(req.key)
        res.cookie("Authorization", "", { path: "/", signed: true, httpOnly: true, maxAge: -1})
        return logMiddleware.logResponse(res, 200, {
            data: "successfully logout",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const checkAuthenticated = async (req, res, next) => {
    try {
        return logMiddleware.logResponse(res, 200, {
            data: "successfully authenticated",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const checkPermission1 = async (req, res, next) => {
    try {
        return logMiddleware.logResponse(res, 200, {
            data: "successfully permitted",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const changeUsername = async (req, res, next) => {
    try {
        const sessionUserId = req.user.id
        const username = req.body.username
        const result = await userService.changeUsername(sessionUserId, username)
        return logMiddleware.logResponse(res, 200, {
            data: result,
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const sessionUserId = req.user.id
        const result = await userService.changePassword(sessionUserId, req.body)
        return logMiddleware.logResponse(res, 200, {
            data: "successfully change password",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    login,
    refreshToken,
    loginRedis,
    checkLoginRedis,
    loginMap,
    checkLoginMap,
    logout,
    logoutRedis,
    logoutMap,
    checkAuthenticated,
    checkPermission1,
    changeUsername,
    changePassword
}