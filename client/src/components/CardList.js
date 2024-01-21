import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

function CartList() {
    const { state } = useCart();

    return (
        <div className="cart-list">
            <h1 style={{textAlign:"center"}}>Cart List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ backgroundColor: 'gray', color: 'gold' }}>No</th>
                        <th style={{ backgroundColor: 'gray', color: 'gold' }}>Book Name</th>
                        <th style={{ backgroundColor: 'gray', color: 'gold' }}>Author</th>
                        <th style={{ backgroundColor: 'gray', color: 'gold' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {state.cartList.map((book, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                <button className="btn btn-danger ms-2">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/book`} className="btn btn-danger ms-2">Back</Link>
        </div>
    );
}

export default CartList;