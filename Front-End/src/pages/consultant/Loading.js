import React, { useEffect, useState } from "react";
// component
import Consultant from "./Consultant";
// img
import userIamge from "../../assets/loadinguser.png";
import rotatingIamge from "../../assets/rotating.png";
import consultantIamge from "../../assets/loadingconsultant.png";
// css style
import classes from "./Loading.module.css";

const Loading = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    document
      .querySelector(`#App`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return loading ? (
    <div className={classes["loading-container"]}>
      <div className={classes["loading-pic"]}>
        <img className={classes.user} src={userIamge} alt="userIamge" />
        <img
          className={classes["loading-rotating-pic"]}
          src={rotatingIamge}
          alt="rotatingIamge"
        />
        <img
          className={classes.consultant}
          src={consultantIamge}
          alt="consultantIamge"
        />
      </div>
      <div className={classes["loading-text"]}>
        <h1 className={classes["h1-1"]}>스타일 변신하기 준비 중</h1>
        <h1 className={classes["h1-2"]}>
          상담중에는 기능이 제한 될 수 있습니다.
        </h1>
      </div>
    </div>
  ) : (
    <Consultant />
  );
};

export default Loading;
