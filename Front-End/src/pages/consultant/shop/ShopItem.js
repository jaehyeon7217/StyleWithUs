import { Fragment } from "react";

const ShopItem = (props) => {
  // item : no, imgLink, maker, link, title, afterPrice;
  const item = props.item;
  return (
    <Fragment>
      <span>{item.no}</span>
      <span>{item.title}</span>
    </Fragment>
  );
};

export default ShopItem;