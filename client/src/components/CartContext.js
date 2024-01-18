import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
    cartList: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cartList: [...state.cartList, action.payload] };
        // Add other cart-related actions if needed
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
