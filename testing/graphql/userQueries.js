import gql from 'graphql-tag'

export const GET_USER = gql`
    query getUser($username: String!) {
        getUser(username: $username) {
            id
            username
        }
    }
`

export const GET_USERS = gql`
    query getUsers {
        getUsers {
            id
            username
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser(
        $username: String!,
        $password: String!,
        $email: String!,
        $name: String!,
        $type: userTypes
        ) {
            createUser(
                username: $username,
                password: $password,
                email: $email,
                name: $name,
                type: $type
            ) {
                id
                username
            }
        }
`

export const DELETE_USER = gql`
    mutation DeleteUser($userId: ID!) {
        deleteUser(userId: $userId)
    }
`

export const LOGIN = gql`
    query Login ($username: String!, $password: String){
        login(username: $username, password: $password){
            role
            token
        }
    }

`
