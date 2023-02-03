import React, { Component, useEffect } from "react";
import OpenViduVideoComponent from "./OvVideo";
import { useSelector } from "react-redux";
import PersonalColor from "./PersonalColor";
import classes from './Video.module.css';

const Video = (props) => {
  // 유저 타입 받아오기
  const userType = useSelector((state) => state.auth.userType);
  
  useEffect(() => {
    console.log(props.streamManager)
  }, [])

  return (
    <div>
      {!userType ? (
        // 유저의 경우 퍼스널컬러 추가
        <div className="video">
          <div className={classes.streamcomponent}>
            <OpenViduVideoComponent streamManager={props.streamManager} sendUserType={userType} />
            <div>
              <PersonalColor />
            </div>
          </div>
        </div>
      ) : (
        // 컨설턴트의 경우 퍼스널컬러 없게
        <div className="video">
          <div className={classes.streamcomponent}>
            <OpenViduVideoComponent streamManager={props.streamManager} sendUserType={userType} />
            <div>
              <PersonalColor />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
