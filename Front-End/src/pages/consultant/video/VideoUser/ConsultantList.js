import { useState, useEffect } from "react";
import ConsultantResume from "./ConsultantResume";
import classes from "./ConsultantList.module.css";
import { useDispatch } from "react-redux";
import consultantmanface from "../../../../assets/consultantmanface.png";
import consultantwomanface from "../../../../assets/consultantwomanface.png";

import { authActions } from "../../../../store/auth";

const ConsultantList = (props) => {
  const dispatch = useDispatch();

  const consultantId = props.consultantId;
  const consultantNickname = props.consultantNickname;
  const consultantGender = props.consultantGender;
  const consultantImage =
    consultantGender === 1 ? consultantmanface : consultantwomanface;
  const consultantResume = props.consultantResume;
  const numberOfPeople = props.numberOfPeople;
  const consultantSessionId = props.sessionId;

  const [showResume, setShowResume] = useState(false);

  const enterSessionHandler = () => {
    const sessionId = consultantSessionId;
    props.onAddSessionId(sessionId);
    props.setGetConsultantId(consultantId);
    props.setGetSessionStatus(false);
    dispatch(authActions.startConsulting(true));
    dispatch(authActions.getMySessionId(sessionId));
  };

  const showResumeHandler = () => {
    setShowResume(true);
  };

  return (
    <div className={classes["consultant-list"]}>
      <div className={classes.consultant}>
        <img src={consultantImage} />
        <div className={classes.text}>
          {consultantNickname}님과 함께
          <div>스타일을 변경하시겠습니까?</div>
        </div>
      </div>
      <div className={classes["button-display"]}>
        <input
          className={classes.button}
          type="button"
          value="경력보기"
          onClick={showResumeHandler}
        />
        {showResume && (
          <ConsultantResume
            setShowResume={setShowResume}
            consultantId={consultantId}
            consultantResume={consultantResume}
          />
        )}
        <input
          className={numberOfPeople ? classes.button : classes["button-unable"]}
          type="button"
          value={numberOfPeople ? "입장하기" : "상담 중"}
          disabled={!numberOfPeople}
          onClick={enterSessionHandler}
        />
      </div>
    </div>
  );
};

export default ConsultantList;
