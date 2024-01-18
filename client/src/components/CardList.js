import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap';

function CartList() {
    const { state } = useCart();

    return (
        <div className="cart-list">
            <h1 style={{textAlign:"center"}}>Cart List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {state.cartList.map((book, index) => (
                        <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/book`} className="btn btn-danger ms-2">Back</Link>
        </div>
    );
}

export default CartList;