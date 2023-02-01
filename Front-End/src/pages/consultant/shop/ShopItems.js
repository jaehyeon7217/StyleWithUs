import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./ShopItems.module.css";

const ShopItems = (props) => {
  const [pagination, setPagination] = useState(0);

  const type = props.detailPage.type;
  const detail = props.detailPage.detail;

  const items = useSelector(state => state.shop.category)

  return (
    <Fragment>
      <h3>{detail}</h3>
      <ul>
        {items[type][detail].map((item) => {
          return <li></li>
        })}
      </ul>
      <div></div>
    </Fragment>
  );
};

export default ShopItems;