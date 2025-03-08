import { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";

import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";
import { DELETE_BOOK } from "../utils/mutations";
import { removeBookId } from "../utils/localStorage";
import type { User } from "../models/User";

const SavedBooks = () => {
  // Send the userID directly from localStorage
  const { loading, data } = useQuery(GET_ME, {
    variables: {
      userID: localStorage.getItem('id_token'), // Send the userID directly
    },
  });
  


  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: ["GetMe"], // Ensure UI updates
  });
  const userData: User | null = data?.me || null;
  console.log("User Data:", userData); // 🔍 Debugging
  console.log("Saved Books:", userData?.savedBooks);

  const handleDeleteBook = async (bookId: string) => {
    try {
      const { data } = await deleteBook({
        variables: {
          userId: localStorage.getItem("id_token"), // Get userId from localStorage
          bookId,
        },
        update(cache) {
          const existingData = cache.readQuery<{ me: User }>({ query: GET_ME });
  
          if (!existingData) return;
  
          cache.writeQuery({
            query: GET_ME,
            data: {
              me: {
                ...existingData.me,
                savedBooks: existingData.me.savedBooks.filter(
                  (book) => book.bookId !== bookId
                ),
              },
            },
          });
        },
      });
  
      console.log("Deleted book:", data);
      removeBookId(bookId); // Remove from localStorage
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };
  

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>
            {userData?.username
              ? `Viewing ${userData.username}'s saved books!`
              : "Viewing saved books!"}
          </h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData?.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>

        <Row>
          {userData?.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border="dark">
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors.join(", ")}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
