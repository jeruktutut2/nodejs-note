import supertest from "supertest"
import { web } from "../../src/application/web"
import prismaClient from "../../src/application/database"

describe("POST /api/v1/user/register", () => {

    afterEach(async () => {
        await prismaClient.user.delete({
            where: {
                username: "username1"
            }
        })
    })

    it("should register user", async () => {
        const result = await supertest(web)
            .post("/api/v1/user/register")
            .send({
                "username": "username1",
                "email": "email",
                "password": "password@A1"
            })

        expect(result.status).toBe(201)
        expect(result.body.data.username).toBe("username")
        expect(result.body.error).toBe("")
    })
})