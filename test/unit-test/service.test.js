import service from "../../src/services/service.js";
import repository from "../../src/repository/repository.js";

jest.mock("../../src/repository/repository.js")

test("mock repository findById", () => {
    repository.findById.mockImplementation((id) => {
        return {
            id: id,
            name: "name"
        }
    })

    const repo = service.findById(1)

    console.log("repo:", repo);
})