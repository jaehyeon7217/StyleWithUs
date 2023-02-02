import { Fragment } from "react";

import classes from "./ShopItem.module.css";

const ShopItem = (props) => {
  // item : no, imgLink, maker, link, title, afterPrice;
  const item = props.item;
  return (
    <Fragment>
      <div className={classes.index}>{item.no}.</div>
      <img src={item.imgLink} alt="item-img" className={classes.img}/>
      <div className={classes.title}>{item.title}</div>
    </Fragment>
  );
};

export default ShopItem;