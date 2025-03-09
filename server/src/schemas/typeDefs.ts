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
    savedBooks: [Book]
    bookCount: Int
  }

  type Query {
    users: [User]
    getUser(id: ID, username: String): User
    me(userID: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    saveBook(userId: ID!, book: BookInput!): User
    deleteBook(userId: ID!, bookId: String!): User
    login(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
  user: User
  }
  
  input BookInput {
    _id: ID
    bookId: String!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
  }
`;

export default typeDefs;
