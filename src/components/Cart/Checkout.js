import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => {
  return value.trim() === "";
};
const isFiveChars = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const nameChangedHandler = (e) => {
    if (isEmpty(e.target.value)) {
      setFormInputValidity((prev) => {
        return { ...prev, name: false };
      });
    } else {
      setFormInputValidity((prev) => {
        return { ...prev, name: true };
      });
    }
  };
  const streetChangedHandler = () => {
    if (isEmpty(e.target.value)) {
      setFormInputValidity((prev) => {
        return { ...prev, street: false };
      });
    } else {
      setFormInputValidity((prev) => {
        return { ...prev, street: true };
      });
    }
  };
  const postalChangedHandler = (e) => {
    if (isEmpty(e.target.value)) {
      setFormInputValidity((prev) => {
        return { ...prev, postal: false };
      });
    } else {
      setFormInputValidity((prev) => {
        return { ...prev, postal: true };
      });
    }
  };
  const cityChangedHandler = (e) => {
    if (isEmpty(e.target.value)) {
      setFormInputValidity((prev) => {
        return { ...prev, city: false };
      });
    } else {
      setFormInputValidity((prev) => {
        return { ...prev, city: true };
      });
    }
  };

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputValidity((prev) => {
      return {
        ...prev,
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postal: enteredCityIsValid,
        city: enteredPostalIsValid,
      };
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    const orderData = {
      id: "id" + Math.random(),
      name: nameInputRef.current.value,
      street: streetInputRef.current.value,
      postal: postalInputRef.current.value,
      city: cityInputRef.current.value,
    };
    props.onConfirmOrder(orderData);
  };

  const nameInputClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetInputClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalInputClasses = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={nameChangedHandler}
          ref={nameInputRef}
          type="text"
          id="name"
        ></input>
        {!formInputValidity.name && (
          <p className={classes.invalidMessage}>Please enter a valid name!</p>
        )}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          onChange={streetChangedHandler}
          ref={streetInputRef}
          type="text"
          id="street"
        ></input>
        {!formInputValidity.street && (
          <p className={classes.invalidMessage}>Please enter a valid street!</p>
        )}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal</label>
        <input
          onChange={postalChangedHandler}
          ref={postalInputRef}
          type="text"
          id="postal"
        ></input>
        {!formInputValidity.postal && (
          <p className={classes.invalidMessage}>
            Please enter a valid postal code!
          </p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          onChange={cityChangedHandler}
          ref={cityInputRef}
          type="text"
          id="city"
        ></input>
        {!formInputValidity.city && (
          <p className={classes.invalidMessage}>Please enter a valid city!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancelOrder}>
          Cancel
        </button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
