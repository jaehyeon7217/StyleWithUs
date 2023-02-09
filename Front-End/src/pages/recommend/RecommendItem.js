import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { cartActions } from "../../store/cart";
import classes from "./RecommendItem.module.css";

const RecommendItem = (props) => {
  const clothesData = props.data;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  const url = "https://i8d105.p.ssafy.io/be/item/regist";

  const onClickHandler = async () => {
    await axios
      .post(
        url,
        {
          userId: userId,
          itemImgLink: clothesData.image,
          itemName: clothesData.title,
          itemUri: clothesData.url,
          itemPrice: clothesData.price,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
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
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div className={classes.div}>
        <a href={clothesData.url} className={classes.clothes} target="_blank">
          <img src={clothesData.image} alt="clothes_img" />
          <div className={classes.title}>{clothesData.title}</div>
          <div className={classes.maker}>{clothesData.maker}</div>
          <div className={classes.price}>{clothesData.price}</div>
        </a>
        <div className={classes.btn}>
          <button onClick={onClickHandler}>장바구니에 담기 +</button>
        </div>
      </div>
    </Fragment>
  );
};

export default RecommendItem;
