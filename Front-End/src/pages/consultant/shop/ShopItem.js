import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { cartActions } from "../../../store/cart"

import classes from "./ShopItem.module.css";

const ShopItem = (props) => {
  // item : no, imgLink, maker, link, title, afterPrice;
  const item = props.item;

  const user = useSelector(state => state.auth);
  const userId = props.userId;

  const cartUpdate = useSelector((state) => state.cart.update);

  const dispatch = useDispatch();

  const onClickHandler = async () => {
    await axios
      .post(
        'https://i8d105.p.ssafy.io/be/item/regist',
        {
          userId: userId,
          itemImgLink: item.imgLink,
          itemName: item.title,
          itemUri: item.link,
          itemPrice: item.afterPrice,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      )
      .then((response) => {
        Swal.fire({
          position: 'bottom-end',
          html: '<div style="font-size:15px;font-family:Apple_Gothic_Neo_SB; display:flex;justify-content:center;align-items:center;line-height:18px; color: white;">장바구니에 담겼습니다</div>',
          width: 180,
          showConfirmButton: false,
          timer: 1000,
          backdrop: 'transparent',
          background: '#4CAAFF',
          padding: 10
        })
      })
      .catch((error) => {
        console.log(error);
      });

    if (user.userType === 0) {
      axios
      .get(`https://i8d105.p.ssafy.io/be/item/show/${userId}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((response) => {
        dispatch(cartActions.getCart(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      dispatch(cartActions.updateCart());
    }
  };

  return (
    <Fragment>
      <div className={classes.content}>
        <a href={item.link} target="_blank">
          <div className={classes.index}>{item.no}.</div>
          <img src={item.imgLink} alt="item-img" className={classes.img} />
          <div className={classes.title}>{item.title}</div>
        </a>
      </div>
      <div className={classes.button} onClick={onClickHandler}>
        <span className="material-symbols-outlined">add_shopping_cart</span>
      </div>
    </Fragment>
  );
};

export default ShopItem;
