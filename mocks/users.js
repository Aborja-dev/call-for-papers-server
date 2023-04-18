import bcrypt from 'bcrypt'


export const users = [
    { username: 'user1', password: '123abc', email: 'user1@example.com', name: 'User 1'},
    { username: 'user2', password: '456def', email: 'user2@example.com', name: 'User 2'},
    { username: 'user3', password: '789ghi', email: 'user3@example.com', name: 'User 3'},
    { username: 'user4', password: '101jkl', email: 'user4@example.com', name: 'User 4'},
    { username: 'user5', password: '112mno', email: 'user5@example.com', name: 'User 5'}
];

const setId = ()=>users.map((user, index) => {
    return {...user, id: index}
})

export const usersWithId = setId()

const setHash = ()=>users.map(({username, email, name, password}) => {
    return {
        username,
        passwordHash: bcrypt.hashSync(password, 2),
        email,
        name,
    }
})

export const usersWithHash = setHash()