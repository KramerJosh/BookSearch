import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation addUser($username: String!, $email: String!) {
    addUser(username: $username, email: $email) {
      _id
      username
      email
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $book: BookInput!) {
    saveBook(userId: $userId, book: $book) {
      _id
      username
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation removeBook($userId: ID!, $bookId: String!) {
    removeBook(userId: $userId, bookId: $bookId) {
      _id
      username
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

// export const LOGIN_USER = gql`
//   mutation loginUser($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//     }
//   }
// `;


// export const SIGNUP_USER = gql`
//   mutation signUpUser($username: String!, $email: String!, $password: String!) {
//     signUp(username: $username, email: $email, password: $password) {
//       token
//     }
//   }
// `;
