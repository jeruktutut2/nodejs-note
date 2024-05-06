const permission1 = async (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            data: "",
            error: "Unauthorized"
        }).end()
        return
    }
    if (!req.user.permissions.includes(1)) {
        res.status(401).json({
            data: "",
            error: "Unauthorized"
        }).end()
        return
    }
    next()
}

const checkPermission = async (req, res, next) => {
    let permissinoMatch = false
    for (let i = 0; i < req.user.permissions.length; i++) {
        if (req.user.permissions[i].permission_id === 1) {
            permissinoMatch = true
            break
        }
    }
    if (permissinoMatch) {
        next()
    } else {
        res.status(401).json({
            data: "",
            error: "unauthorized"
        })
        return
    }
}

const checkNopermission = async (req, res, next) => {
    let permissinoMatch = false
    for (let i = 0; i < req.user.permissions.length; i++) {
        if (req.user.permissions[i].permission_id === 0) {
            permissinoMatch = true
            break
        }
    }
    if (permissinoMatch) {
        next()
    } else {
        res.status(403).json({
            data: "",
            error: "not permitted"
        })
        return
    }
}

export default {
    permission1,
    checkPermission,
    checkNopermission
}