import { useSelector } from "react-redux";
import classes from "./Video.module.css";

import PersonalColor from "./PersonalColor";
import PersonalColorPicker from "./PersonalColorPicker";

const Video = () => {
  const userType = useSelector((state) => state.auth.token);

  // 유저타입이 User일 경우에
  // 퍼스널 컬러 피커와 퍼스널 컬러 컴포넌트를 띄운다.
  if (userType === 0) {
    return (
      <div className={classes.video}>
        <p>User</p>
        <PersonalColor />
        <PersonalColorPicker />
      </div>
    );
  }

  return (
    <div className={classes.video}>
      <p>Consultant</p>
    </div>
  );
};

export default Video;
