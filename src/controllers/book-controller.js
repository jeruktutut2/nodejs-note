import bookService from "../services/book-service.js";

const create = async (req, res, next) => {
    try {
        const result = await bookService.create(req.body)
        res.status(201).json({
            data: {
                name: result.name,
                price: Number(result.price),
                stock: result.stock
            },
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await bookService.findById(id)
        res.status(200).json({
            data: result,
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const findMany = async (req, res, next) => {
    try {
        const take = parseInt(req.query.numberOfData)
        const skip = (req.query.page - 1) * take
        const result = await bookService.findMany(skip, take)
        res.status(200).json({
            data: result,
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const updateName = async (req, res, next) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const result = await bookService.updateName(id, name)
        res.status(200).json({
            data: result,
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await bookService.update(req.body)
        res.status(200).json({
            data: result,
            error: ""
        })
        return
    } catch (error) {
        next(error)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const id = req.body.id
        const result = await bookService.deleteBook(id)
        res.status(200).json({
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