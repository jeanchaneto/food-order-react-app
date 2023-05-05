import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    //update state in inmutable way by using concat() instead of push
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount  = state.totalAmount + action.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  if (action.type === 'REMOVE') {

  }
  return defaultCartState;
}

const CartProvider = (props) => {

 const [cartState, dispatchCartAction ] =  useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: 'ADD',
      item: item
    })
  };

  const removeItemfromCartHandler = (id) => {
    dispatchCartAction({
      type: 'REMOVE',
      id: id
    })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    additem: addItemToCartHandler,
    removeItem: removeItemfromCartHandler
  }

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
};

export default CartProvider;