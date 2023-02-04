import { useState, useEffect } from "react";
import ConsultantResume from "./ConsultantResume";
import classes from "./ConsultantList.module.css";

const ConsultantList = (props) => {
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
    props.setGetSessionStatus(false);
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
