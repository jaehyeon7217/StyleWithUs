import { Fragment } from "react";

import classes from "./ShopItem.module.css";

const ShopItem = (props) => {
  // item : no, imgLink, maker, link, title, afterPrice;
  const item = props.item;
  return (
    <Fragment>
      <div className={classes.content}>
        <a href={item.link} target="_blank">
          <div className={classes.index}>{item.no}.</div>
          <img src={item.imgLink} alt="item-img" className={classes.img} />
          <div className={classes.title}>{item.title}</div>
        </a>
      </div>
      <div className={classes.button}>
        <span className="material-symbols-outlined">add_shopping_cart</span>
      </div>
    </Fragment>
  );
};

export default ShopItem;
