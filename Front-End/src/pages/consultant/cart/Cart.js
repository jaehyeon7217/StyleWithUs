import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { cartActions } from "../../../store/cart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/auth";

const Cart = (props) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userType = useSelector((state) => state.auth.userType);
  const userCartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userType === 1 && props.userId !== null) {
      axios.get(`https://i8d105.p.ssafy.io/be/item/show/${props.userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        dispatch(cartActions.getCart(response.data.data));
      })
      .catch((error) => {
        if(error.response.status===401){
          Swal.fire({
            title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>', 
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>', 
            width : 330,
            icon: 'error',
            confirmButtonText:'<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
            confirmButtonColor: '#9A9A9A',
          }).then(()=>{
            navigate('/')
            dispatch(authActions.logout(""))
          })
        }
      });
    } else if (userType === 1 && props.userId === null) {
      dispatch(cartActions.resetCart());
    }
  }, [props.userId]);

  const cssClasses = props.className + " " + classes.cart;

  return (
    <div className={cssClasses}>
      <h2 className={classes.h2}>장바구니</h2>
      <div className={classes.wall}></div>
      <ul className={classes.ul}>
        {userCartItems.map((item, idx) => {
          return (
            <li key={idx}>
              <CartItem
                index={item.itemNo}
                title={item.itemName}
                img={item.itemImgLink}
                price={item.itemPrice}
                url={item.itemUri}
                session={props.session}
                userId={props.userId}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
