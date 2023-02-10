import classes from "./Shop.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

import ClothesType from "./ClothesType";
import ShopItems from "./ShopItems";

const Shop = (props) => {
  const [toggleOn, setToggleOn] = useState("");
  const [shopOn, setShopOn] = useState(false);
  const [detailPage, setDetailPage] = useState(null);

  const userGender = props.userGender;

  let arrayCategory = [];
  let gender = undefined;
  if (userGender === 1) {
    gender = "men";
  } else if (userGender === 0) {
    gender = "women";
  } else {
    gender = null;
  }

  const category = useSelector((state) => state.shop.category[gender]);
  if (gender !== null) {
    arrayCategory = Object.keys(category);
  }

  const toggleEventHandler = (liTitle) => {
    if (toggleOn !== "") {
      const container = document.getElementById(toggleOn);
      container.style.height = "0px";
    }
    setToggleOn(liTitle);
  };

  const detailShopOn = (data) => {
    setShopOn(true);
    setDetailPage(data);
  };

  const detailShopOff = () => {
    setShopOn(false);
    setDetailPage(null);
  };

  return (
    <div className={classes.shop}>
      <h2 className={classes.h2}>카테고리</h2>
      <div className={classes.wall}></div>
      {!shopOn && gender !== null && (
        <ul className={classes.ul}>
          {arrayCategory.map((type) => {
            return (
              <li key={type}>
                <ClothesType
                  type={type}
                  gender={gender}
                  onToggle={toggleEventHandler}
                  toggleData={type === toggleOn ? true : false}
                  detailShop={detailShopOn}
                />
              </li>
            );
          })}
        </ul>
      )}
      {shopOn && gender !== null && <ShopItems detailPage={detailPage} detailShopOff={detailShopOff} gender={gender} userId={props.userId} session={props.session}/>}
    </div>
  );
};

export default Shop;
