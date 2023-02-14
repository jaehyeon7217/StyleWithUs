import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { authActions } from "../../../store/auth";

import { cartActions } from "../../../store/cart";
import classes from "./CartItem.module.css";
import { useNavigate } from "react-router-dom";

const CartItem = (props) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const userType = useSelector((state) => state.auth.userType);

  if (userType === 1) {
    userId = props.userId
  }

  const dispatch = useDispatch();

  const deleteCartItem = async () => {
    await axios.delete(`https://i8d105.p.ssafy.io/be/item/delete/${props.index}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        Swal.fire({
          position: 'bottom-end',
          html: '<div style="font-size:15px;font-family:Apple_Gothic_Neo_SB; display:flex;justify-content:center;align-items:center;line-height:18px; color: white;">장바구니에서 삭제되었습니다</div>',
          width: 230,
          showConfirmButton: false,
          timer: 1500,
          backdrop: 'transparent',
          background: '#f24141',
          padding: 10
        })
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
    
    if (props.session !== undefined) {
      await props.session
      .signal({
        data: 'cart select', 
        to: [], 
        type: "cart", 
      })
      .then(() => {
      })
      .catch((error) => {
        console.error(error);
      });
    };

    await axios.get(`https://i8d105.p.ssafy.io/be/item/show/${userId}`, {
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

  };

  return <Fragment>
    <div className={classes.div}>
      <a href={props.url} className={classes.a} target="_blank">
        <div>
          <img src={props.img} alt={`${props.title}_img`} className={classes.img} />
          <span>{props.title}</span>
        </div>
        <span>{props.price}</span>
      </a>
      <button onClick={deleteCartItem}>삭제</button>
    </div>
  </Fragment>
};

export default CartItem;