import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { cartActions } from "../../store/cart";
import axios from "axios";
import Swal from "sweetalert2";
// component
import MyPageSideBar from "./MyPageSideBar";
import MyWishItem from "./MyWishItem";
// css style
import classes from "./MyPageWish.module.css";

const MyPageWish = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const getMyWish = () => {
    const url = "https://i8d105.p.ssafy.io/be/item/show/" + userId;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        dispatch(cartActions.getCart(response.data.data));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire({
            title:
              '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>',
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>',
            width: 330,
            icon: "error",
            confirmButtonText:
              '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
            confirmButtonColor: "#9A9A9A",
          }).then(() => {
            navigate("/");
            dispatch(authActions.logout(""));
          });
        }
      });
  };

  useEffect(() => {
    getMyWish();
  });

  useEffect(() => {
    document
      .querySelector(`#App`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div>
      <div className={classes.WrapMyPage}>
        <MyPageSideBar />
        <div className={classes.WishBox}>
          <h3 className={classes.WishPageName}>관심 상품</h3>
          <hr className={classes.hr} />
          <div className={classes.scroll}>
            <ul className={classes.ul}>
              {cartItems.map((item, idx) => {
                return (
                  <li key={idx}>
                    <MyWishItem
                      index={item.itemNo}
                      title={item.itemName}
                      img={item.itemImgLink}
                      price={item.itemPrice}
                      url={item.itemUri}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageWish;
