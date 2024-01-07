import React from "react";

function BookList({books, removeBook}){
    return(
    <div>
        <ul>
            {books.map((book, index)=>
                <li key={index}>
                    <span>{book.title}</span>
                    <span>{book.author}</span>
                    <span>{book.pages}</span>
                    <span>{book.stock}</span>
                    <button className="removeButton" onClick={() => removeBook(index)}>Remove</button>
                </li>
            )}
        </ul>
    </div>
    )
}

export default BookList;