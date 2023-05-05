import Modal from '../UI/Modal'
import classes from './Cart.module.css'

const Cart = (props) => {
const cartItems = (
<ul className={classes['cart-items']}> 
  {[{id: 'd5', name: 'tart', amount: 4, price: 3.59}].map((item, index) => (<li key={index} >{item.name}</li>))}
</ul> )

  return (
    <Modal>
        {cartItems}   
        <div className={classes.total}>
          <span>Total Amount</span> 
          <span>38.82</span>
        </div>
        <div className={classes.actions} >
            <button className={classes['button--alt']}>Close</button>
            <button className={classes.button}>Order</button>
        </div>
    </Modal>
    
  );
};

export default Cart

