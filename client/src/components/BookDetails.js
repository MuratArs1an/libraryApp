import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useHistory } from "react-router-dom";

function BookDetails({ book }) {
    const history = useHistory();

    const handleBack = () => {
        // Navigate back to http://localhost:3001/book
        history.push('/book');
    };
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`client/src/${book.image}`} alt={book.title} />
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                    <strong>Author: </strong> {book.author}<br />
                    <strong>Pages:</strong> {book.pages}<br />
                    <strong>Stock:</strong> {book.stock}<br />
                    <strong>Details:</strong> {book.bookDetails}
                </Card.Text>
                <Button variant="primary" onClick={handleBack}>Back</Button>
            </Card.Body>
        </Card>
    );
}

export default BookDetails;
