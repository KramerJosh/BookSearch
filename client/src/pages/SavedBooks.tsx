import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { DELETE_BOOK } from "../utils/mutations";
import { removeBookId } from "../utils/localStorage";
import type { User } from "../models/User";

const SavedBooks = () => {
  // Send the userID directly from localStorage
  // not sure if there's a better way of handling this, but if we aren't worrying about authentication this seems ok
  const { loading, data } = useQuery(GET_ME, {
    variables: {
      userID: localStorage.getItem('id_token'),
    },
  });
  


  const [deleteBook] = useMutation(DELETE_BOOK, {
    //when you delete the buttons should update
    refetchQueries: ["GetMe"], 
  });
  const userData: User | null = data?.me || null;

  const handleDeleteBook = async (bookId: string) => {
    try {
      const { data } = await deleteBook({
        variables: {
          userId: localStorage.getItem("id_token"), 
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
      removeBookId(bookId); 
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
