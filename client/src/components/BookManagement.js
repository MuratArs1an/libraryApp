import React, { useState, useEffect } from "react";
import { BrowserRouter as Route, Routes } from "react-router-dom";
import axios from 'axios';
import BookList from "./BookList";
import BookForm from './BookForm';
import BookDetails from './BookDetails';
import { useSearch } from './SearchContext'

function BookManagement() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const { searchQuery } = useSearch();

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
            formData.append("details", newBook.details);
            formData.append("image", newBook.image);

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
            const bookId = books[index].id;
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

    const selectBook=(index)=>{
        const book=books[index];
        setSelectedBook(book)
    }

    const updateBook = async (updatedBook) => {
        try {
            const response = await axios.put(`http://localhost:3000/book/edit/${selectedBook.id}`, updatedBook);
            const updatedBooks = books.map(book => (book._id === selectedBook.id ? response.data : book));
            setBooks(updatedBooks);
            setSelectedBook(null); // Reset selectedBook after successful update
            selectBook(null);
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 mt-5">
                    <BookForm addBook={addBook} selectedBook={selectedBook} updateBook={updateBook} />
                </div>
                <div className="col-md-8 mt-5">
                    <Routes>
                        <Route path="/book" element= {<BookList books={books.filter(
                        (book) =>
                            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchQuery.toLowerCase())
                    )} removeBook={removeBook} selectBook={selectBook} />} />
                        <Route path="/book/:index" element={<BookDetails book={books}/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default BookManagement;