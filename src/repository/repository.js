const findById = async (id) => {
    if (!id) {
        throw new Error("ups")
    }
    return "find by id"
}

const findBySkipAndTake = async (skip, take) => {
    return "skip and take"
}

export default {
    findById,
    findBySkipAndTake
}