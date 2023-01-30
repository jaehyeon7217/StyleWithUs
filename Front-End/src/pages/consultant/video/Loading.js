import React from "react";
import userIamge from '../../../assets/user.png';
import rotatingIamge from '../../../assets/rotating.png';
import consultantIamge from '../../../assets/consultant.png';
import classes from './Loading.module.css';

const Loading = () => {
  return (
    <div>
      <img className={classes.img} src={userIamge} alt="userIamge" />
      <img className={classes.img} src={rotatingIamge} alt="rotatingIamge" />
      <img className={classes.img} src={consultantIamge} alt="consultantIamge" />
      <h1>스타일 변신하기 준비 중</h1>
    </div>
  );
};

export default Loading;
