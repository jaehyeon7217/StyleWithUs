import { useSelector } from "react-redux";
import { Fragment } from "react";

import LengthType from "./LengthType";
import classes from "./Recommend.module.css";
import RecommendItemBox from "./RecommendItemBox";
// import TopLengthImage from "../../assets/clothes/상의.png";

const Recommend = () => {
  const clothesLengthTypes = [
    { type: "어깨너비", data: 47 },
    { type: "가슴단면", data: 50 },
    { type: "소매길이", data: 60 },
    { type: "허리단면", data: 31 },
    { type: "엉덩이단면", data: 35 },
    { type: "허벅지단면", data: 26 },
    { type: "밑단단면", data: 24 },
    { type: "키", data: 171 },
    { type: "신발사이즈", data: 265 },
  ];
  const clothesTypes = ["상의", "하의", "아우터", "신발"];

  return (
    <Fragment>
      <div className={classes["background"]}>
        <h1>Recommend</h1>
        <div className={classes["clothes-measure"]}>
          {clothesLengthTypes.map((data, idx) => {
            return (
              <LengthType
                timer={data.type === "키" || data.type === "신발사이즈" ? 5 : Math.floor(Math.random() * 40) + 20}
                data={data.data}
                type={data.type}
                key={`${data.type}-${idx}`}
              />
            );
          })}
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
