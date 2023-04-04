import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = (e) => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    const orderData = {
      user: userData,
      orderedItems: cartCtx.items,
    };

    const response = await fetch(
      "https://simple-react-app-2b7b6-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      setErrorMessage("Something went wrong, try again.");
    }

    setIsSubmiting(false);
    setDidSubmit(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirmOrder={submitOrderHandler}
          onCancelOrder={props.onClose}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const submitingContent = <h1>Sending your order data...</h1>;
  const successContent = (
    <React.Fragment>
      <h1>
        Your order is successfully sent, you will be contacted soon , once we're
        done preparing your order.
      </h1>
      <div className={classes.actions}>
        <button onClick={props.onClose}>Allright!</button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && !didSubmit && submitingContent}
      {didSubmit && !isSubmiting && successContent}
    </Modal>
  );
};

export default Cart;
