import { useEffect, useRef } from "react";
import classes from "./ConsultantResume.module.css";

const ConsultantResume = (props) => {
  const closeResumeHandler = () => {
    props.setShowResume(false);
  };

  // 모달 외부 클릭 시 끄기 처리
  const modalRef = useRef();

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setShowResume(false);
      }
    };
    // 이벤트 핸들러 등록
    // 컴퓨터
    document.addEventListener("mousedown", handler);
    // 모바일
    document.addEventListener("touchstart", handler);

    return () => {
      // 컴퓨터
      document.removeEventListener("mousedown", handler);
      // 모바일
      document.removeEventListener("touchstart", handler);
    };
  });

  return (
    <div ref={modalRef} className={classes.container}>
      <h1>ConsultantResume</h1>
      <div>{props.consultantResume}</div>
      <input
        className={classes.close}
        type="button"
        value="X"
        onClick={closeResumeHandler}
      />
    </div>
  );
};

export default ConsultantResume;
