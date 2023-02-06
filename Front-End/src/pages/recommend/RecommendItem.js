import { Fragment } from "react";

import classes from "./RecommendItem.module.css";

const RecommendItem = (props) => {
  const clothesData = props.data;

  return (
    <Fragment>
      <a href={clothesData.url} className={classes.clothes} target="_blank">
        <img src={clothesData.image} alt="clothes_img"/>
        <div className={classes.title}>{clothesData.title}</div>
        <div className={classes.maker}>{clothesData.maker}</div>
        <div className={classes.price}>{clothesData.price}</div>
      </a>
    </Fragment>
  );
};

export default RecommendItem;