import React, { Fragment } from "react";
import { useSelector } from "react-redux";
// component
import OpenViduVideoComponent from "./OvVideo";
import PersonalColor from "./PersonalColor";
// css style
import classes from "./Video.module.css";

const Video = (props) => {
  // 유저 타입 받아오기
  const userType = useSelector((state) => state.auth.userType);

  // 유저 상태 확인해서 user에만 personal color 뜨도록
  const status = props.status;

  return (
    <Fragment>
      {status === "user" ? (
        <div className={classes.video}>
          <div className={classes.streamcomponent}>
            <OpenViduVideoComponent
              streamManager={props.streamManager}
              sendUserType={userType}
            />
            <PersonalColor />
          </div>
        </div>
      ) : (
        <div className={classes.video}>
          <div className={classes.streamcomponent}>
            <OpenViduVideoComponent
              streamManager={props.streamManager}
              sendUserType={userType}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Video;
