import { useRef, useState } from 'react';
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {

  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountRef.current.value;
    //value is ALWAYS a string so we convert to number:
    const enteredAmountFormatted = +enteredAmount;

    //validation logic
    if (enteredAmount.trim().length === 0 
    || enteredAmountFormatted < 1 || 
    enteredAmountFormatted >5) {
      setAmountIsValid(false);
      return
    }
    props.onAddToCart(enteredAmountFormatted);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
    <Input 
      ref={amountRef}
      label='Amount'
      input={{
      id: 'amount_' + props.id,
      type: 'number',
      min: '1',
      max: '5',
      step: '1',
      defaultValue: '1'
    }}/>
    <button >+ Add</button>
    {!amountIsValid && <p>Please enter a valid amount between 1 to 5</p> }
    </form>
  )
}

export default MealItemForm