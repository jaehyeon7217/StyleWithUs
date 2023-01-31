import { Fragment } from "react";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return <Fragment>
    <a href={props.url} className={classes.a} target="_blank">
      <div>
        <img src={props.img} alt={`${props.title}_img`} className={classes.img} />
        <span>{props.title}</span>
      </div>
      <span>{props.price}</span>
    </a>
  </Fragment>
};

export default CartItem;