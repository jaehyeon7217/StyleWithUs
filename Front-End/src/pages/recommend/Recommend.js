import { useSelector } from "react-redux";
import { Fragment } from "react";

import classes from "./Recommend.module.css";
import RecommendItemBox from "./RecommendItemBox";

const Recommend = () => {
  const clothesTypes = ["상의", "하의", "아우터", "신발"];

  return (
    <Fragment>
      <div className={classes["h1-background"]}>
        <h1>
          당신에게 맞는 핏의 옷은?
        </h1>
      </div>
      <div className={classes.recommend}>
        {clothesTypes.map((type, idx) => {
          return <RecommendItemBox type={type} key={`${type}-${idx}`}/>;
        })}
      </div>
    </Fragment>
  );
};

export default Recommend;
