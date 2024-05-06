import session from "../globals/session.js";
import envGlobals from "../globals/env.js";
import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
    const authorization = req.signedCookies["Authorization"]
    if (!authorization) {
        res.status(401).json({
            data: "",
            error: "unauthorized"
        })
        return
    }
    
    try {
        const decoded = jwt.verify(authorization, envGlobals.jwtKey);
    } catch (error) {
        res.status(500).json({
            data: "",
            error: error
        })
    }
    next()
}

export default {
    authentication
}