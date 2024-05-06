import bookService from "../services/book-service.js";
import logMiddleware from "../middleware/log-middleware.js";

const create = async (req, res, next) => {
    try {
        const result = await bookService.create(req.body)
        return logMiddleware.logResponse(res, 200, {
            data: {
                name: result.name,
                price: Number(result.price),
                stock: result.stock
            },
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await bookService.findById(id)
        return logMiddleware.logResponse(res, 200, {
            data: result,
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const findMany = async (req, res, next) => {
    try {
        const take = parseInt(req.query.numberOfData)
        const skip = (req.query.page - 1) * take
        const result = await bookService.findMany(skip, take)
        return logMiddleware.logResponse(res, 200, {
            data: result,
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const updateName = async (req, res, next) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const result = await bookService.updateName(id, name)
        return logMiddleware.logResponse(res, 200, {
            data: result,
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await bookService.update(req.body)
        return logMiddleware.logResponse(res, 200, {
            data: result,
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const id = req.body.id
        const result = await bookService.deleteBook(id)
        return logMiddleware.logResponse(res, 200, {
            data: "successfully delete",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    findById,
    findMany,
    updateName,
    update,
    deleteBook
}