const cookieSecret = ""
const jwtKey = ""
const jwtAccessTokenExpireTime = 0
const jwtRefreskTokenExpireTime = 0

const getCookieSecret = () => {
    return process.env.COOKIE_SECRET
}

const getJwtKey = () => {
    return process.env.JWT_KEY
}

const getJwtAccessTokenExpireTime = () => {
    return process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME
}

const getJwtRefreshTokenExpireTime = () => {
    return process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME
}

export default {
    cookieSecret,
    jwtKey,
    jwtAccessTokenExpireTime,
    jwtRefreskTokenExpireTime,
    getCookieSecret,
    getJwtKey,
    getJwtAccessTokenExpireTime,
    getJwtRefreshTokenExpireTime
}