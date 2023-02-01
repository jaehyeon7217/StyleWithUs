import classes from "./Shop.module.css";

import { useState } from "react";
import { useSelector } from "react-redux";
import ClothesType from "./ClothesType";

const Shop = () => {
  const [toggleOn, setToggleOn] = useState("");
  const [shopOn, setShopOn] = useState(false);

  const category = useSelector((state) => state.shop.category);
  const arrayCategory = Object.keys(category);

  const toggleEventHandler = (liTitle) => {
    if (toggleOn !== "") {
      const container = document.getElementById(toggleOn);
      container.style.height = "0px";
    }
    setToggleOn(liTitle);
  };

  const detailShop = (data) => {
    setShopOn(true);
    console.log(data);
  };

  return (
    <div className={classes.shop}>
      <h2 className={classes.h2}>카테고리</h2>
      <div className={classes.wall}></div>
      {!shopOn && <ul className={classes.ul}>
        {arrayCategory.map((type) => {
          return (
            <li key={type}>
              <ClothesType
                type={type}
                onToggle={toggleEventHandler}
                toggleData={type === toggleOn ? true : false}
                detailShop={detailShop}
              />
            </li>
          );
        })}
      </ul>}
    </div>
  );
};

export default Shop;
