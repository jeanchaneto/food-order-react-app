import { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {

  const [btnIsAnimated, setBtnIsAnimated ] =  useState(false)

  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount
  }, 0)

const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ''}`;
 
useEffect(() => {
  if (cartCtx.items.length === 0) {
    return;
  }
  setBtnIsAnimated(true);

const timer = setTimeout(() => {
  setBtnIsAnimated(false);
}, 300);

return () => {
  clearTimeout(timer);
}

}, [cartCtx.items])

  return (
    <button className={btnClasses} onClick={props.onClick} >
      <span>
      <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton