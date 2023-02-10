import { useState, useEffect } from "react";
import ConsultantResume from "./ConsultantResume";
import classes from "./ConsultantList.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../store/auth";

const ConsultantList = (props) => {
  const dispatch = useDispatch();

  const consultantId = props.consultantId;
  const consultantNickname = props.consultantNickname;
  const consultantGender = props.consultantGender;
  const consultantGenderType = consultantGender === 1 ? "남자" : "여자";
  const consultantResume = props.consultantResume;
  const numberOfPeople = props.numberOfPeople;
  const consultantSessionId = props.sessionId;

  const [showResume, setShowResume] = useState(false);

  const enterSessionHandler = () => {
    const sessionId = consultantSessionId;
    props.onAddSessionId(sessionId);
    props.setGetConsultantId(consultantId)
    props.setGetSessionStatus(false);
    dispatch(authActions.startConsulting(true))
    dispatch(authActions.getMySessionId(sessionId))
  };

  const showResumeHandler = () => {
    setShowResume(true);
  };

  return (
    <div>
      <div>{consultantNickname}</div>
      <div>{consultantGenderType}</div>
      <input type="button" value="경력보기" onClick={showResumeHandler} />
      {showResume && (
        <ConsultantResume
          setShowResume={setShowResume}
          consultantId={consultantId}
          consultantResume={consultantResume}
        />
      )}
      <input
        type="button"
        value="입장하기"
        disabled={!numberOfPeople}
        onClick={enterSessionHandler}
      />
    </div>
  );
};

export default ConsultantList;
