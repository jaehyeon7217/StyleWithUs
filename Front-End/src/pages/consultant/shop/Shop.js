import classes from "./Shop.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

import ClothesType from "./ClothesType";
import ShopItems from "./ShopItems";

const Shop = () => {
  const [toggleOn, setToggleOn] = useState("");
  const [shopOn, setShopOn] = useState(false);
  const [detailPage, setDetailPage] = useState(null);

  const userGender = useSelector(state => state.auth.userData.userGender);
  const gender = userGender ? "men" : "women";

  const category = useSelector((state) => state.shop.category[gender]);
  const arrayCategory = Object.keys(category);

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
      {!shopOn && (
        <ul className={classes.ul}>
          {arrayCategory.map((type) => {
            return (
              <li key={type}>
                <ClothesType
                  type={type}
                  onToggle={toggleEventHandler}
                  toggleData={type === toggleOn ? true : false}
                  detailShop={detailShopOn}
                />
              </li>
            );
          })}
        </ul>
      )}
      {shopOn && <ShopItems detailPage={detailPage} detailShopOff={detailShopOff}/>}
    </div>
  );
};

export default Shop;
