import repository from "../repository/repository.js";

const findById = async (id) => {
    return await repository.findById(id)
}

const findBySkipAndTake = async (skip, take) => {
    return await repository.findBySkipAndTake(skip, skip)
}

export default {
    findById,
    findBySkipAndTake
}