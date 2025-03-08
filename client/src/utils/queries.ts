import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me($userID: String!) {
    me(userID: $userID) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        title
        description
        image
      }
    }
  }
`;
