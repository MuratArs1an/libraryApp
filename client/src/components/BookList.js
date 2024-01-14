import React, { useState } from "react";
import { Link } from "react-router-dom";

function BookList({ books, removeBook,selectBook}) {

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
                                <button className="btn btn-success" onClick={() => selectBook(index)}>Update</button>
                                <button className="btn btn-danger" onClick={() => removeBook(index)}>Remove</button>
                                <Link to={`/book/${index}`} className="btn btn-secondary">Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
