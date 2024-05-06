import prismaClient from "../application/database.js";

const create = async (request) => {
    return await prismaClient.book.create({
        data: {
            name: request.name,
            price: request.price,
            stock: request.stock
        },
        select: {
            name: true,
            price: true,
            stock: true
        }
    })
}

const findById = async (id) => {
    return await prismaClient.book.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            name: true,
            price: true,
            stock: true
        }
    })
}

const findMany = async (skip, take) => {
    const books =  await prismaClient.book.findMany({
        skip: skip,
        take: take,
        select: {
            id: true, 
            name: true,
            price: true,
            stock: true
        }
    })
    books.forEach(book => {
        book.price = Number(book.price)
    });
    return books
}

const updateName = async (id, name) => {
    return await prismaClient.book.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: name
        },
        select: {
            id: true,
            name: true
        }
    })
}

const update = async (request) => {
    const book = await prismaClient.book.update({
        where: {
            id: parseInt(request.id)
        },
        data: {
            name: request.name,
            price: Number(request.price),
            stock: request.stock
        },
        select: {
            id: true,
            name: true, 
            price: true,
            stock: true
        }
    })
    book.price = parseFloat(book.price)
    return book
}

const deleteBook = async (id) => {
    return await prismaClient.book.delete({
        where: {
            id: parseInt(id)
        }
    })
}

export default {
    create,
    findById,
    findMany,
    updateName,
    update,
    deleteBook
}