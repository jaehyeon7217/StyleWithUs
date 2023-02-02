import classes from "./ConsultantList.module.css";

const ConsultantList = (props) => {
  const consultantNickname = props.consultantNickname;
  const consultantGender = props.consultantGender;
  const consultantGenderType = consultantGender === 1 ? '남자' : '여자';
  const consultantSessionId = props.sessionId;

  const enterSessionHandler = () => {
    const sessionId = consultantSessionId;
    console.log(sessionId)
    props.onAddSessionId(sessionId);
  };

  return (
    <div>
      <div>{consultantNickname}</div>
      <div>{consultantGenderType}</div>
      <input type="button" value="경력보기" />
      <input type="button" value="입장하기" onClick={enterSessionHandler} />
    </div>
  );
};

export default ConsultantList;
