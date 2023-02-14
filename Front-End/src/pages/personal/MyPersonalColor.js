import { Fragment } from "react";

import classes from "./MyPersonalColor.module.css";
import Image from "../../assets/mainPage/컨설턴트.png"

const MyPersonalColor = () => {
  return (
    <Fragment>
      <div className={classes.background}>
        <div className={classes.words}>
          <h1 className={classes.h1}>퍼스널 컬러 자가진단</h1>
          <p className={classes.p}>나는 봄/가을 웜톤일까? 여름/가을 쿨톤일까?</p>
        </div>
        <div className={classes['img-box']}>
          <img src={Image} alt="man" />
          <button>검사하러 가기</button>
        </div>
      </div>
    </Fragment>
  );
};

export default MyPersonalColor;