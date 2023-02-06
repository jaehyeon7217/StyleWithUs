import { useSelector } from "react-redux";
import { Fragment } from "react";

import classes from "./Recommend.module.css";
import RecommendItemBox from "./RecommendItemBox";
// import TopLengthImage from "../../assets/clothes/상의.png";

const Recommend = () => {
  const clothesTypes = ["상의", "하의", "아우터", "신발"];

  return (
    <Fragment>
      <div className={classes["background"]}>
        <h1>당신에게 맞는 핏의 옷은?</h1>
        <div className={classes["clothes-measure"]}>
          <div>총장&nbsp;<span>60</span></div>
          <div>어깨너비&nbsp;<span>60</span></div>
          <div>가슴단면&nbsp;<span>60</span></div>
          <div>소매길이&nbsp;<span>60</span></div>
          <div>허리단면&nbsp;<span>60</span></div>
          <div>엉덩이단면&nbsp;<span>60</span></div>
          <div>허벅지단면&nbsp;<span>60</span></div>
          <div>밑단&nbsp;<span>60</span></div>
          <div>키&nbsp;<span>100</span></div>
          <div>신발사이즈&nbsp;<span>100</span></div>
        </div>
        <div className={classes.recommend}>
          {clothesTypes.map((type, idx) => {
            return <RecommendItemBox type={type} key={`${type}-${idx}`} />;
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Recommend;
