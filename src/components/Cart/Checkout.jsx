import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

//Helpers function for form validation
const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 5;

const Checkout = (props) => {

  //State to show form validity to user
  const [ formValidity, setFormValidity ] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
    })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const cityName = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeCodeIsValid = !isNotFiveChars(enteredPostalCode);
    const cityNameIsValid = !isEmpty(cityName);

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeCodeIsValid,
      city: cityNameIsValid
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeCodeIsValid && cityNameIsValid

    if (!formIsValid) {
      return
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: cityName
    })

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${!formValidity.name ? classes.invalid : ''}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formValidity.name && <p>Enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${!formValidity.street ? classes.invalid : ''}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formValidity.street && <p>Enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${!formValidity.postalCode ? classes.invalid : ''}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formValidity.postalCode && <p>Enter a valid post code (5 characters long)</p>}
      </div>
      <div className={`${classes.control} ${!formValidity.city ? classes.invalid : ''}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formValidity.city && <p>Enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
