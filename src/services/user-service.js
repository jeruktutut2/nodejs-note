import { validate } from "../validations/validation.js"
import { registerUserValidation, loginUserValidation } from "../validations/user-validation.js";
import prismaClient from "../application/database.js";
import { ResponseException } from "../exception/response-exception.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import session from "../globals/session.js";
import jwt from "jsonwebtoken";
import envGlobals from "../globals/env.js";
import { fileTypeFromTokenizer } from "file-type/core";
import redisApp from "../application/redis.js";

const register = async (request) => {
    const user = validate(registerUserValidation ,request)
    const countUser = await prismaClient.user.count({
        where: {
            email: request.email
        }
    })

    if (countUser > 0) {
        throw new ResponseException("400", "user already exists")
    }

    user.password = await bcrypt.hash(user.password, 10)
    user.created_at = new Date().getTime()

    return await prismaClient.user.create({
        data: user,
        select: {
            username: true,
            email: true
        }
    })
}

const login = async (request) => {
    const loginValidation = validate(loginUserValidation, request)
    const user = await prismaClient.user.findFirst({
        where: {
            email: request.email
        },
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
            utc: true,
            userPermissions: true
        }
    })

    if (user === null) {
        throw new ResponseException("401", "wrong email or password")
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password)
    if (!isPasswordValid) {
        throw new ResponseException("401", "wrong email or password")
    }
    
    const nowInSecond = Math.round(new Date().getTime() / 1000) + (Math.abs(new Date().getTimezoneOffset()) * 60)
    console.log("nowInSecond:", nowInSecond);
    const expireIn = nowInSecond + (60 *  envGlobals.jwtAccessTokenExpireTime)

    // why not use notBefore, because when try to verify it, and if your local timezone is more than utc, there always before it
    const accessToken = jwt.sign({id: user.id, username: user.username, email: user.email, permissions: user.userPermissions}, envGlobals.jwtKey, {algorithm: "HS256", expiresIn: expireIn, subject: "login"})
    const expireInRefreshToken = nowInSecond + (envGlobals.jwtRefreskTokenExpireTime * 24 * 60 * 60)
    const refreshToken = jwt.sign({}, envGlobals.jwtKey, {algorithm: "HS256", expiresIn: expireInRefreshToken, subject: "login"})

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

const refreshToken = async (request) => {
    const user = await prismaClient.user.findFirst({
        where: {
            email: request.email
        },
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
            utc: true,
            userPermissions: true
        }
    })

    if (user === null) {
        throw new ResponseException("401", "cannot find user")
    }

    const accessToken = jwt.sign({id: user.id, username: user.username, email: user.email, permissions: user.userPermissions}, envGlobals.jwtKey, {algorithm: "HS256", expiresIn: expireIn, subject: "login"})
    return accessToken
}

const loginRedis = async (request) => {
    const loginValidation = validate(loginUserValidation, request)
    const user = await prismaClient.user.findFirst({
        where: {
            email: request.email
        },
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
            utc: true,
            userPermissions: true
        }
    })

    if (user === null) {
        throw new ResponseException("401", "wrong email or password")
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password)
    if (!isPasswordValid) {
        throw new ResponseException("401", "wrong email or password")
    }

    const sessionId = uuid().toString()
    await redisApp.redis.set("Authorization", JSON.stringify({id: user.id, username: user.username, email: user.email, permissions: user.userPermissions}))
    return sessionId
}

const loginMap = async (request) => {
    const loginValidation = validate(loginUserValidation, request)
    const user = await prismaClient.user.findFirst({
        where: {
            email: request.email
        },
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
            utc: true,
            userPermissions: true
        }
    })

    if (user === null) {
        throw new ResponseException("401", "wrong email or password")
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password)
    if (!isPasswordValid) {
        throw new ResponseException("401", "wrong email or password")
    }

    const sessionId = uuid().toString()
    session.sessions.set(sessionId, {id: user.id, username: user.username, email: user.email, permissions: user.userPermissions})
    return sessionId
}

const logoutRedis = async (key) => {
    return await redisApp.redis.del(key)
}

const logoutMap = async (key) => {
    return session.sessions.delete(key)
}

const changeUsername = async (sessionUserId, username) => {
    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            username: true
        }
    })

    if (user) {
        throw new ResponseException("400", "user already exists")
    }

    return await prismaClient.user.update({
        where: {
            id: parseInt(sessionUserId)
        },
        data: {
            username: username
        },
        select: {
            id: true,
            username: true
        }
    })
}

const changePassword = async (sessionUserId, request) => {
    const user = await prismaClient.user.findUnique({
        where: {
            id: parseInt(sessionUserId)
        },
        select: {
            password: true
        }
    })

    if (!user) {
        throw new ResponseException("400", "cannot find user")
    }

    const isPasswrodvalid = await bcrypt.compare(request.oldPassword, user.password)
    if (!isPasswrodvalid) {
        throw new ResponseException("400", "old password is invalid")
    }

    const newPassword = await bcrypt.hash(request.newPassword, 10)
    return await prismaClient.user.update({
        where: {
            id: parseInt(sessionUserId)
        },
        data: {
            password: newPassword
        }
    })
}

export default {
    register,
    login,
    refreshToken,
    loginRedis,
    loginMap,
    logoutRedis,
    logoutMap,
    changeUsername,
    changePassword
}