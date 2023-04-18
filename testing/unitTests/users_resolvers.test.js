import { server } from "../../setup/setupServer"

beforeAll = (async () => {
    await server.start()
})

afterAll = (async () => {
    await server.stop()
})

test('should get users', async () => { 
    const query = `
    query GetAllUsers {
        getUsers {
            name
        }
    }
    `
    const result = await server.executeOperation({ query })
    expect(result.body.singleResult.data.getUsers).toBeDefined()
})
 

