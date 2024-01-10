import React from "react";

function BookList({ books, removeBook, updateBook }) {
    return (
        <div>
            <h3>Book List</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Book Pages</th>
                        <th>Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.pages}</td>
                            <td>{book.stock}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => updateBook(index)}>Update</button>
                                <button className="btn btn-danger" onClick={() => removeBook(index)}>Remove</button>
                                <button className="btn btn-secondary">Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
