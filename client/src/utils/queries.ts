import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    getUser {
      _id
      username
      email
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

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
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
