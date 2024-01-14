import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from "react-router-dom";

function BookDetails({ book }) {
    const navigate = useNavigate();
    const params=useParams();
    const index=params.index

    const handleBack = () => {
        // Navigate back to http://localhost:3001/book
        navigate('/book');
    }

    const selectedBook=book[index];

    return (
        <Card style={{ width: '20rem'}}>
            <img  src={`${process.env.PUBLIC_URL}${selectedBook.image}`} alt={selectedBook.title} />
            <Card.Body>
                <Card.Title>{selectedBook.title}</Card.Title>
                <Card.Text>
                    <strong>Author: </strong> {selectedBook.author}<br />
                    <strong>Pages:</strong> {selectedBook.pages}<br />
                    <strong>Stock:</strong> {selectedBook.stock}<br />
                    <strong>Details:</strong> {selectedBook.details}
                </Card.Text>
                <Button variant="primary" onClick={handleBack}>Back</Button>
            </Card.Body>
        </Card>
    );
}

export default BookDetails;
