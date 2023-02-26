import { Fragment } from "react";
// css style
import classes from "./RecommendNull.module.css";

const RecommendNull = () => {
  return (
    <Fragment>
      <p className={classes["p-null"]}>검색된 정보가 없습니다</p>
    </Fragment>
  );
};

export default RecommendNull;
