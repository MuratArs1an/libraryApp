import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from "react-router-dom";
import { CartFill } from "react-bootstrap-icons"

function BookDetails({ book }) {
    const navigate = useNavigate();
    const params = useParams();
    const index = params.index

    const handleBack = () => {
        // Navigate back to http://localhost:3001/book
        navigate('/book');
    }

    const selectedBook = book[index];

    return (
        <Card className="flex-row flex-wrap card" style={{ width: '100%' }}>
            <Card.Img
                src={`${process.env.PUBLIC_URL}${selectedBook.images}`}
                alt={selectedBook.title}
                style={{ width: '350px', height: '450px', objectFit: 'cover', float:'left' }}
            />
            <Card.Body className="d-flex flex-column" style={{float:'right'}}>
                <div className="flex-grow-1">
                    <Card.Title style={{fontSize:'80px'}}>{selectedBook.title}</Card.Title>
                    <Card.Text style={{fontSize:'25px'}}>
                        <strong>Author: </strong> {selectedBook.author}<br />
                        <strong>Pages:</strong> {selectedBook.pages}<br />
                        <strong>Stock:</strong> {selectedBook.stock}<br />
                        <strong>Details:</strong> {selectedBook.details}
                    </Card.Text>
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" onClick={handleBack}>
                        Back
                    </Button>
                    <Button variant="secondary" style={{ marginLeft: '10px' }}>
                        <CartFill />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default BookDetails;
