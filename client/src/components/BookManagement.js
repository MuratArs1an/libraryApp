import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';
import BookList from "./BookList";
import BookForm from './BookForm';
import BookDetails from './BookDetails';
import { useSearch } from './SearchContext';
import CartList from "./CardList";
import CardPage from "./CardPage";

function BookManagement({ showCartList}) {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const { searchQuery } = useSearch();
    const navigate = useNavigate();

    const openBookFormPage = (book) => {
        setSelectedBook(book);
        navigate('/book/new'); 
    };

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

    const updateBookList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/book');
            setBooks(response.data);
        } catch (error) {
            console.error('Error updating book list:', error);
        }
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 mt-5">
                    <Routes>
                        <Route path="/book" element= {<BookList books={books.filter(
                        (book) =>
                            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchQuery.toLowerCase())
                    )} removeBook={removeBook} openBookFormPage={openBookFormPage} updateBookList={updateBookList} />} />
                        <Route path="/book/:index" element={<BookDetails book={books}/>} />
                        <Route path="/book/new" element={<BookForm addBook={addBook} updateBook={updateBook} selectedBook={selectedBook} updateBookList={updateBookList} />} />
                        <Route path="/cart" element={<CardPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default BookManagement;