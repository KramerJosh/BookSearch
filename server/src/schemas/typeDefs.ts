const typeDefs = `
type Book {
    _id: ID!
    bookId: String!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    saveBooks: BookDocument[] ##Start HERE
}

type Query {

}

type Mutation {

}

`;

export default typeDefs;