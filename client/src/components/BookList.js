import React, { useState } from "react";
import { Link } from "react-router-dom";


function BookList({ books, removeBook,updateBookList, openBookFormPage}) {

    return (
        <div>
            <h1 style={{textAlign:"center", fontWeight:"bold"}}>Book List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ backgroundColor: 'gray', color: 'gold' }}>BOOK NAME</th>
                        <th style={{ backgroundColor: 'gray', color: 'gold' }}>AUTHOR</th>
                        <th style={{ backgroundColor: 'gray', color: 'gold' }}>BOOK PAGE</th>
                        <th style={{ backgroundColor: 'gray', color: 'gold' }}>STOCK</th>
                        <th style={{ backgroundColor: 'gray', color: 'gold' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td title="title">{book.title}</td>
                            <td title="author">{book.author}</td>
                            <td title="pages">{book.pages}</td>
                            <td title="stock">{book.stock}</td>
                            <td>
                                <button className="btn btn-success ms-5" onClick={() => openBookFormPage(book)}>Update</button>
                                <button className="btn btn-danger ms-2" onClick={() => removeBook(index)}>Remove</button>
                                <Link to={`/book/${index}`} className="btn btn-secondary ms-2">Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <button  style={{width:"400px", color:"white" , fontWeight: 'bold'}} className="btn btn-info" onClick={()=>openBookFormPage()}>Add Book</button>
            </div>
        </div>
    );
}

export default BookList;
