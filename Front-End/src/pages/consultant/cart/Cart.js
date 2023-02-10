import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useEffect } from "react";

const Cart = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userType = useSelector((state) => state.auth.userType);
  const userCartItems = useSelector((state) => state.cart.cartItems);
  const cartUpdate = useSelector((state) => state.cart.update);
  const [cartItems, setCartItem] = useState(userCartItems);

  useEffect(() => {
    if (userType === 1 && props.userId !== null) {
      axios.get(`https://i8d105.p.ssafy.io/be/item/show/${props.userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCartItem(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    } else if (userType === 1 && props.userId === null) {
      setCartItem([]);
    }
  }, [props.userId])

  useEffect(() => {
    if (userType === 1 && props.userId !== null) {
      axios.get(`https://i8d105.p.ssafy.io/be/item/show/${props.userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCartItem(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [cartUpdate])

  useEffect(() => {
    axios.get(`https://i8d105.p.ssafy.io/be/item/show/${props.userId}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      setCartItem(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [props.userId])

  const cssClasses = props.className + ' ' + classes.cart;

  return (
    <div className={cssClasses}>
      <h2 className={classes.h2}>장바구니</h2>
      <div className={classes.wall}></div>
      <ul className={classes.ul}>
        {userType === 0 ? userCartItems.map((item, idx) => {
          return (
            <li key={idx}>
              <CartItem
                index={idx + 1}
                title={item.itemName}
                img={item.itemImgLink}
                price={item.itemPrice}
                url={item.itemUri}
              />
            </li>
          );
        })
        : cartItems.map((item, idx) => {
          return (
            <li key={idx}>
              <CartItem
                index={idx + 1}
                title={item.itemName}
                img={item.itemImgLink}
                price={item.itemPrice}
                url={item.itemUri}
              />
            </li>
          );
        })
        }
      </ul>
    </div>
  );
};

export default Cart;
