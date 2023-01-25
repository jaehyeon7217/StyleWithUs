import classes from "./Cart.module.css";

import CartItem from "./CartItem";

const Cart = (props) => {
  const cssClasses = classes.cart + ' ' + props.className

  console.log(cssClasses);

  return <div className={cssClasses}>
    <p>cart</p>
    <CartItem />
    <CartItem />
    <CartItem />
    <CartItem />
  </div>
};

export default Cart;