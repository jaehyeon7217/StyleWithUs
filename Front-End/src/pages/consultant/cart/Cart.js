import classes from "./Cart.module.css";

import CartItem from "./CartItem";

const Cart = () => {
  return <div className={classes.cart}>
    <p>cart</p>
    <CartItem />
    <CartItem />
    <CartItem />
    <CartItem />
  </div>
};

export default Cart;