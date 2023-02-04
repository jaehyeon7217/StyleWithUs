import { useState } from "react";
import ConsultantResume from "./ConsultantResume";
import classes from "./ConsultantList.module.css";

const ConsultantList = (props) => {
  const consultantNickname = props.consultantNickname;
  const consultantGender = props.consultantGender;
  const consultantGenderType = consultantGender === 1 ? "남자" : "여자";
  const consultantSessionId = props.sessionId;
  const consultantResume = props.consultantResume;

  const [showResume, setShowResume] = useState(false);

  const enterSessionHandler = () => {
    const sessionId = consultantSessionId;
    props.onAddSessionId(sessionId);
  };

  const showResumeHandler = () => {
    setShowResume(true);
  };

  return (
    <div>
      <div>{consultantNickname}</div>
      <div>{consultantGenderType}</div>
      <input type="button" value="경력보기" onClick={showResumeHandler} />
      {showResume && <ConsultantResume setShowResume={setShowResume} consultantResume={consultantResume} />}
      <input type="button" value="입장하기" onClick={enterSessionHandler} />
    </div>
  );
};

export default ConsultantList;
