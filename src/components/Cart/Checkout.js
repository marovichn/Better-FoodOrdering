import classes from "./Checkout.module.css";
import { useRef } from "react";

const isEmpty = (value) => {
  return value.trim() === "";
};
const isNotFiveChars = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = isEmpty(enteredName);
    if (
      enteredNameIsValid ||
      isEmpty(enteredStreet) ||
      isEmpty(enteredCity) ||
      isNotFiveChars(enteredPostal)
    ) {
      return;
    }

    const orderData = {
      id: Math.random(),
      name: nameInputRef.current.value,
      street: streetInputRef.current.value,
      postal: postalInputRef.current.value,
      city: cityInputRef.current.value,
    };
    props.onConfirmOrder(orderData);
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal</label>
        <input ref={postalInputRef} type="text" id="postal"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city"></input>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancelOrder}>
          Cancel
        </button>
        <button type="button">Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
