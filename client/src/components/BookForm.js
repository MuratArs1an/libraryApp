import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function BookForm({ addBook, updateBook, selectedBook, updateBookList }) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        pages: 0,
        stock: 0,
        details: "",
        image:""
    });
    const navigate = useNavigate();

    const handleBack = () => {
        // Navigate back to http://localhost:3001/book
        navigate('/book');
    }

    useEffect(() => {
        if (selectedBook) {
            setFormData({
                title: selectedBook.title,
                author: selectedBook.author,
                pages: selectedBook.pages,
                stock: selectedBook.stock,
                details: selectedBook.details,
                image: selectedBook.image
            });
        } else {
            setFormData({
                title: "",
                author: "",
                pages: 0,
                stock: 0,
                details: "",
                image: ""
            });
        }
    }, [selectedBook]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = {
            title: formData.title,
            author: formData.author,
            pages: parseInt(formData.pages, 10),
            stock: parseInt(formData.stock, 10),
            details: formData.details,
            image: formData.image,
        };
    
        if (selectedBook) {
            // If selectedBook exists, it's an update
            await updateBook(newBook);
            await updateBookList();
        } else {
            // If selectedBook doesn't exist, it's a new book
            addBook(newBook);
        }
        navigate('/book')
        e.target.reset();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded" encType="multipart/form-data">
            <h2>{selectedBook ? "Edit Book" : "Add New Book"}</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Book Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter book title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">
                    Author
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="pages" className="form-label">
                    Pages
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="pages"
                    name="pages"
                    placeholder="Enter number of pages"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                    Stock
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="stock"
                    name="stock"
                    placeholder="Enter stock quantity"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Book Details
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="details"
                    name="details"
                    placeholder="Enter book details"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    Book Image
                </label>
                <div className="form-group">
                <input type="file" name="image" className="form-control-file rounded-0" style={{marginBottom:10}}
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                </div>
                <button type="submit" className="btn btn-primary">
                    {selectedBook ? "Update Book" : "Add Book"}
                </button>
                <Button variant="danger" onClick={handleBack} style={{float: 'right'}}>Back</Button>
                </div>
        </form>
    );
}

export default BookForm;
