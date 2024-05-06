import session from "../globals/session.js";

const authenticationMap = async (req, res, next) => {
    const authorization = req.signedCookies["Authorization"]
    if (!authorization) {
        res.status(401).json({
            data: "",
            error: "unauthorized"
        })
        return
    }
    const user = session.sessions.get(authorization)
    if (!user) {
        res.status(401).json({
            data: "",
            error: "unauthorized"
        })
        return
    }
    req.user = user
    req.key = authorization
    next()
}

export default {
    authenticationMap
}