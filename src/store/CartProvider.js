import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    
    const updatedTotalAmount  = state.totalAmount + action.item.price * action.item.amount;

    //look for existing item in cart
    const existingCartItemsIndex = state.items.findIndex((item) => item.id === action.item.id);

    const existingCartItem = state.items[existingCartItemsIndex];
    let updatedItems;

    if (existingCartItem) {
      //Create an item with updated amount key
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      //Override the item with updated item
      updatedItems[existingCartItemsIndex] = updatedItem;
    } else {
      //update state in inmutable way by using concat() instead of push
      updatedItems = state.items.concat(action.item);
    } 
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }

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
      id: id,
    })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemfromCartHandler
  }

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
};

export default CartProvider;