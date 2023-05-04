import classes from './Cart.module.css'

const Cart = () => {
const cartItmems = <ul> {[{id: 'd5', name: 'tart', amount: 4, price: 3.59}].map((item) => (<li>{item.name}</li>))}</ul> 

  return (
    <div>
    {cartItmems}   
        <div className={classes.total}>
        <span>Totam Amount</span> 
        <span>38.82</span>
        </div>
        <div className={classes.acions} >
            <button className={classes['button--alt']}>Close</button>
            <button className={classes.button}>Order</button>
        </div>
    </div>
    
  )
}

export default Cart