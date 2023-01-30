import React, { useEffect } from "react";
import userIamge from "../../../assets/user.png";
import rotatingIamge from "../../../assets/rotating.png";
import consultantIamge from "../../../assets/consultant.png";
import classes from "./Loading.module.css";

const Loading = () => {
  useEffect(() => {}, [])

  return (
    <div className={classes['loading-container']}>
      <div className={classes["loading-pic"]}>
        <img src={userIamge} alt="userIamge" />
        <img className={classes["loading-rotating-pic"]} src={rotatingIamge} alt="rotatingIamge" />
        <img src={consultantIamge} alt="consultantIamge" />
      </div>
      <div className={classes['loading-text']}>
        <h1>스타일 변신하기 준비 중</h1>
      </div>
    </div>
  );
};

export default Loading;
