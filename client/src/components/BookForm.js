import React, { useState, useEffect } from "react";

function BookForm({ addBook, updateBook, selectedBook }) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        pages: 0,
        stock: 0,
        bookDetails: "",
        image:""
    });

    useEffect(() => {
        if (selectedBook) {
            setFormData({
                title: selectedBook.title,
                author: selectedBook.author,
                pages: selectedBook.pages,
                stock: selectedBook.stock,
                bookDetails: selectedBook.bookDetails,
                image:selectedBook.image
            });
        } else {
            setFormData({
                title: "",
                author: "",
                pages: 0,
                stock: 0,
                bookDetails: "",
                image: ""
            });
        }
    }, [selectedBook]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newBook = {
            title: formData.get("title"),
            author: formData.get("author"),
            pages: parseInt(formData.get("pages"), 10),
            stock: parseInt(formData.get("stock"), 10),
            bookDetails: formData.get("bookDetails"),
            image: formData.get("image"),
        };
        addBook(newBook);
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
                    value={formData.bookDetails}
                    onChange={(e) => setFormData({ ...formData, bookDetails: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                    Book Image
                </label>
                <div className="form-group">
                <input type="file" name="image" className="form-control-file rounded-0" style={{marginBottom:10}} />
                </div>
                <button type="submit" className="btn btn-primary">
                    {selectedBook ? "Update Book" : "Add Book"}
                </button>
                </div>
        </form>
    );
}

export default BookForm;
