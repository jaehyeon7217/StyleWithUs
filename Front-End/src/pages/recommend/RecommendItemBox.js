import { useState, Fragment } from "react";
// component
import RecommendItem from "./RecommendItem";
import RecommendNull from "./RecommendNull";
// css style
import classes from "./RecommendItemBox.module.css";

const RecommendItemBox = (props) => {
  const [showBtn, setShowBtn] = useState(1);

  // title, image, price, url
  const clothesData = props.data;

  const onClickHandler = () => {
    setShowBtn((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <Fragment>
      <div className={classes.box}>
        <h3 className={classes.h3}>{props.type}</h3>
        <div className={classes["clothes-items"]}>
          {clothesData !== null ? (
            clothesData.map((data, idx) => {
              return idx < showBtn * 4 ? (
                <RecommendItem key={`${data.title}-${idx}`} data={data} />
              ) : (
                ""
              );
            })
          ) : (
            <RecommendNull />
          )}
        </div>
        <div className={classes["button-box"]}>
          <button onClick={onClickHandler}>더보기</button>
        </div>
      </div>
    </Fragment>
  );
};

export default RecommendItemBox;
