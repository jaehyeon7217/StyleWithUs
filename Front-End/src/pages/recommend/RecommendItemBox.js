import { useState, Fragment } from "react";
import classes from "./RecommendItemBox.module.css";

import RecommendItem from "./RecommendItem";

const RecommendItemBox = (props) => {
  const [showBtn, setShowBtn] = useState(1);

  // title, image, price, url
  const clothesData = props.data

  const onClickHandler = () => {
    setShowBtn((prevState) => {
      return prevState + 1;
    })
  };

  return (
    <Fragment>
      <div className={classes.box}>
        <h3 className={classes.h3}>{props.type}</h3>
        <div className={classes['clothes-items']}>
          {clothesData.map((data, idx) => {
            return idx < showBtn * 4 ? <RecommendItem key={`${data.title}-${idx}`} data={data}/> : "";
          })}
        </div>
        <div className={classes['button-box']}>
          <button onClick={onClickHandler}>더보기</button>
        </div>
      </div>
    </Fragment>
  );
};

export default RecommendItemBox;
