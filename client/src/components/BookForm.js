import React from "react";

function BookForm({ addBook }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newBook = {
            title: formData.get("title"),
            author: formData.get("author"),
            pages: parseInt(formData.get("pages"), 10),
            stock: parseInt(formData.get("stock"), 10),
        };
        addBook(newBook);
        e.target.reset();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input name="title" placeholder="Book Title" required />
            </div>
            <div>
                <input name="author" placeholder="Author" required />
            </div>
            <div>
                <input name="pages" type="number" placeholder="Pages" required />
            </div>
            <div>
                <input name="stock" type="number" placeholder="Stock" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
}

export default BookForm;
