import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { cartActions } from "../../store/cart";
import axios from "axios";
import Swal from "sweetalert2";
// css style
import classes from "./RecommendItem.module.css";

const RecommendItem = (props) => {
  const clothesData = props.data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  const img = useRef();

  const url = "https://i8d105.p.ssafy.io/be/item/regist";

  const onClickHandler = async () => {
    await axios
      .post(
        url,
        {
          userId: userId,
          itemImgLink: clothesData.imgLink,
          itemName: clothesData.title,
          itemUri: clothesData.link,
          itemPrice: clothesData.afterPrice,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        Swal.fire({
          position: "bottom-end",
          html: '<div style="font-size:15px;font-family:Apple_Gothic_Neo_SB; display:flex;justify-content:center;align-items:center;line-height:18px; color: white;">장바구니에 담겼습니다</div>',
          width: 180,
          showConfirmButton: false,
          timer: 1000,
          backdrop: "transparent",
          background: "#4CAAFF",
          padding: 10,
        });
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

    axios
      .get(`https://i8d105.p.ssafy.io/be/item/show/${userId}`, {
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

  const imgLink = clothesData.imgLink.slice(0, -7) + "500.jpg";
  const errorImgLink = clothesData.imgLink.slice(0, -7) + "500.png";

  const onErrorHandler = () => {
    img.current.src = errorImgLink;
  };

  return (
    <Fragment>
      <div className={classes.div}>
        <a href={clothesData.link} className={classes.clothes} target="_blank">
          <img
            src={imgLink}
            alt="clothes_img"
            onError={onErrorHandler}
            ref={img}
          />
          <div className={classes.title}>{clothesData.title}</div>
          <div className={classes.maker}>{clothesData.maker}</div>
          <div className={classes.price}>{clothesData.afterPrice}</div>
        </a>
        <div className={classes.btn}>
          <button onClick={onClickHandler}>장바구니에 담기 +</button>
        </div>
      </div>
    </Fragment>
  );
};

export default RecommendItem;
