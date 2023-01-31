import classes from "./Cart.module.css";
import { useSelector } from "react-redux";

import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cssClasses = props.className + ' ' + classes.cart;

  return (
    <div className={cssClasses}>
      <h2 className={classes.h2}>장바구니</h2>
      <div className={classes.wall}></div>
      <ul className={classes.ul}>
        {cartItems.map((item, idx) => {
          return (
            <li key={idx}>
              <CartItem
                index={idx + 1}
                title={item.title}
                img={item.image}
                price={item.price}
                url={item.url}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
