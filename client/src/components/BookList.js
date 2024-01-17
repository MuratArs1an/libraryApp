import React, { useState } from "react";
import { Link } from "react-router-dom";


function BookList({ books, removeBook,updateBookList, openBookFormPage}) {

    return (
        <div>
            <h1 style={{textAlign:"center"}}>Book List</h1>
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
                                <button className="btn btn-success ms-5" onClick={() => openBookFormPage(book)}>Update</button>
                                <button className="btn btn-danger ms-2" onClick={() => removeBook(index)}>Remove</button>
                                <Link to={`/book/${index}`} className="btn btn-secondary ms-2">Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-grid gap-2">
                <button className="btn btn-info" onClick={()=>openBookFormPage()}>Add Book</button>
            </div>
        </div>
    );
}

export default BookList;
