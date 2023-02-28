import { useEffect, useRef } from "react";
// component
import ConsultantReviews from "./ConsultantReviews";
// css style
import classes from "./ConsultantResume.module.css";

const ConsultantResume = (props) => {
  const consultantId = props.consultantId;

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
      <div className={classes["resume-title"]}>경력사항</div>
      <div className={classes["resume-content"]}>{props.consultantResume}</div>
      <input
        className={classes.close}
        type="button"
        value="X"
        onClick={closeResumeHandler}
      />
      <ConsultantReviews consultantId={consultantId} />
    </div>
  );
};

export default ConsultantResume;
