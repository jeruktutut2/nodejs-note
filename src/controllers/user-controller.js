import userService from "../services/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)
        res.status(201).json({
            data: result,
            error: ""
        })
        return
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
        res.status(200).json({
            data: "successfully logged in",
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const result = userService.refreshToken(req.user)
        res.cookie("Authorization", result.accessToken, { path: "/", signed: true, httpOnly: true})
        res.status(200).json({
            data: "successfully logged in",
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const loginRedis = async (req, res, next) => {
    try {
        const result = userService.loginRedis(req.body)
        res.cookie("Authorization", result, { path: "/", signed: true, httpOnly: true})
        res.status(200).json({
            data: "successfully login redis",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const checkLoginRedis = async (req, res, next) => {
    try {
        res.status(200).json({
            data: req.user,
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const loginMap = async (req, res, next) => {
    try {
        const result = await userService.loginMap(req.body)
        res.cookie("Authorization", result, { path: "/", signed: true, httpOnly: true})
        res.status(200).json({
            data: "successfully login",
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const checkLoginMap = async (req, res, next) => {
    try {
        return res.status(200).json({
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
        res.status(200).json({
            data: "successfully logout",
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const logoutRedis = async (req, res, next) => {
    try {
        const result = await userService.logoutRedis(req.key)
        res.cookie("Authorization", "", { path: "/", signed: true, httpOnly: true, maxAge: -1})
        res.status(200).json({
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
        res.status(200).json({
            data: "successfully logout",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const checkAuthenticated = async (req, res, next) => {
    try {
        res.status(200).json({
            data: "successfully authenticated",
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const checkPermission1 = async (req, res, next) => {
    try {
        res.status(200).json({
            data: "successfully permitted",
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const changeUsername = async (req, res, next) => {
    try {
        const sessionUserId = req.user.id
        const username = req.body.username
        const result = await userService.changeUsername(sessionUserId, username)
        res.status(200).json({
            data: result,
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const sessionUserId = req.user.id
        const result = await userService.changePassword(sessionUserId, req.body)
        res.status(200).json({
            data: "successfully change password",
            error: ""
        })
        return
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