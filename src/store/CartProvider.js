import React from 'react'
import CartContext from './cart-context'

const CartProvider = (props) => {

  const addItemToCartHandler = () => {};

  const removeItemfromCartHandler = () => {}

  const cartContext = {
    items: [],
    totalAmount: 0,
    additem: addItemToCartHandler,
    removeItem: removeItemfromCartHandler
  }

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
};

export default CartProvider;