const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

// to get something from express serer we query and to post someting we o the mutation
async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: ` 
        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user: User
        }

         type Query {
            getTodos: [Todo] 
            getAllUsers: [User] 
            getUser(id: ID!): User
         }
        `,
        // resolvers: {
        //     Query: {
        //         getTodos: () => [
        //             { id: 1, title: "Test Data", completed: false }
        //         ]
        //     }
        // }

        // on the bellow line we perform database operation as we dont have db we are using json placeholder API
        // Query: {
        //         getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
        //     }

        resolvers: {
            Todo: {
                user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            },
            Query: {
                getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser: async (parent, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server Started at PORT 8000"));
}


startServer();