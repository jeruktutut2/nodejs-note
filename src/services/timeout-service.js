import prismaClient from "../application/database.js";

const checkTimeout = async () => {
    console.log("process 1");
    const table1 = await prismaClient.$executeRaw`INSERT INTO table1 (table1) VALUES ("table1");`
    console.log("process 2");
    const sleep1 = await prismaClient.$executeRaw`SELECT SLEEP(3);`
    console.log("process 3");
    const table2 = await prismaClient.$executeRaw`INSERT INTO table2 (table2) VALUES ("table2");`
    console.log("process 4");
    const sleep2 = await prismaClient.$executeRaw`SELECT SLEEP(3);`
    console.log("process 5");
    const table3 = await prismaClient.$executeRaw`INSERT INTO table3 (table3) VALUES ("table3");`
    console.log("process 6");
    return "successfully timeout"
}

const checkTimeoutWithTransaction = async () => {
    return prismaClient.$transaction(async (tx) => {
        const table1 = await tx.$executeRaw`INSERT INTO table1 (table1) VALUES ("table1");`
        const sleep1 = await tx.$queryRaw`SELECT SLEEP(3);`
        const table2 = await tx.$executeRaw`INSERT INTO table2 (table2) VALUES ("table2");`
        const sleep2 = await tx.$queryRaw`SELECT SLEEP(3);`
        const table3 = await tx.$executeRaw`INSERT INTO table3 (table3) VALUES ("table3");`
    })
}

export default {
    checkTimeout,
    checkTimeoutWithTransaction
}