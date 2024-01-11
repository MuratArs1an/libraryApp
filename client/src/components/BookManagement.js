import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from 'axios';
import BookList from "./BookList";
import BookForm from './BookForm';
import BookDetails from './BookDetails';

function BookManagement() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/book');
                setBooks(response.data);
                console.log('Response from server:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const addBook = async (newBook) => {
        try {
            const formData = new FormData();

            formData.append("title", newBook.title);
            formData.append("author", newBook.author);
            formData.append("pages", newBook.pages);
            formData.append("stock", newBook.stock);
            formData.append("bookDetails", newBook.bookDetails);

            // Append the photo file to the FormData
            formData.append("image", newBook.photo);

            const response = await axios.post('http://localhost:3000/book', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setBooks((prevBooks) => [...prevBooks, response.data]);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };
    

    const removeBook = async (index) => {
        try {
            const bookId = books[index]._id;
            await axios.delete(`http://localhost:3000/book/${bookId}`);
            setBooks((prevBooks) => {
                const updatedBooks = [...prevBooks];
                updatedBooks.splice(index, 1);
                return updatedBooks;
            });
        } catch (error) {
            console.error('Error removing book:', error);
        }
    };

    const updateBook = (book) => {
        setSelectedBook(book);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 mt-5">
                    <BookForm addBook={addBook} selectedBook={selectedBook} updateBook={updateBook} />
                </div>
                <div className="col-md-8 mt-5">
                    <Routes>
                        <Route path="/book" element={<BookList books={books} removeBook={removeBook} updateBook={updateBook} />} />
                        <Route path="/book/:index" element={<BookDetails />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default BookManagement;