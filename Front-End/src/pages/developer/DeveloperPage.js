import { useEffect } from "react";
// img
import woman from "../../assets/consultantwoman.png";
import woman2 from "../../assets/mypageuserwoman.png";
import man from "../../assets/footerman.png";
import man2 from "../../assets/consultantman.png";
import man3 from "../../assets/mainPage/퍼스널컬러자가진단맨상체.png";
import man4 from "../../assets/mainPage/퍼스널컬러자가진단맨2상체.png";
// css style
import classes from "./DeveloperPage.module.css";

const DeveloperPage = () => {
  useEffect(() => {
    document
      .querySelector(`#App`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div>
      <div className={classes.pagebox}>
        <div className={classes.page}>
          <div>
            <p className={classes.smallName}>STYLE WITH US DEVELOPER</p>
            <h1 className={classes.bigNamd}>개발 팀</h1>
          </div>
          <div className={classes.contetnbox}>
            <div>
              <img src={man} alt="" className={classes.man} />
              <div className={classes.diaryboxtwo}>
                <div className={classes.dateboxtwo}>
                  <p className={classes.datetwo}>대외협력부장</p>
                  <p className={classes.dash}>-</p>
                </div>
                <p className={classes.datenametwo}>박재현</p>
                <p className={classes.datacontenttwo}>유관 부서 및 기관과 </p>
                <p className={classes.datacontenttwo}>
                  탄력적 비즈니스 관계 유지
                </p>
              </div>
              <img src={man3} alt="" className={classes.man3} />
              <div className={classes.diaryboxtwo}>
                <div className={classes.dateboxtwo}>
                  <p className={classes.datetwo}>S/W 개발 팀장</p>
                  <p className={classes.dash}>-</p>
                </div>
                <p className={classes.datenametwo}>이동엽</p>
                <p className={classes.datacontenttwo}>
                  S/W 개발 전략 수립 및 개발{" "}
                </p>
                <p className={classes.datacontenttwo}></p>
              </div>
              <img src={woman} alt="" className={classes.woman} />
              <div className={classes.diaryboxtwo}>
                <div className={classes.dateboxtwo}>
                  <p className={classes.datetwo}>UX/UI 디자인 팀장</p>
                  <p className={classes.dash}>-</p>
                </div>
                <p className={classes.datenametwo}>양서정</p>
                <p className={classes.datacontenttwo}>
                  사용자 중심의 혁신 디자인 연구{" "}
                </p>
                <p className={classes.datacontenttwo}></p>
              </div>
            </div>
            <div className={classes.vLine}></div>
            <div>
              <div className={classes.diaryboxone}>
                <div className={classes.dateboxone}>
                  <p className={classes.dash}>-</p>
                  <p className={classes.dateone}>총괄 사업 본부장</p>
                </div>
                <p className={classes.datenameone}>이병수</p>
                <p className={classes.datacontent}>사업 전략 수립 및 </p>
                <p className={classes.datacontent}>총괄 검토 업무 수행 </p>
              </div>
              <img src={man2} alt="" className={classes.man2} />
              <div className={classes.diaryboxone}>
                <div className={classes.dateboxone}>
                  <p className={classes.dash}>-</p>
                  <p className={classes.dateone}>R&D 팀장</p>
                </div>
                <p className={classes.datenameone}>박성환</p>
                <p className={classes.datacontent}>
                  핵심 기술파악 및 연구 개발{" "}
                </p>
                <p className={classes.datacontent}></p>
              </div>
              <img src={man4} alt="" className={classes.man4} />
              <div className={classes.diaryboxone}>
                <div className={classes.dateboxone}>
                  <p className={classes.dash}>-</p>
                  <p className={classes.dateone}>S/W 품질관리팀장</p>
                </div>
                <p className={classes.datenameone}>김현진</p>
                <p className={classes.datacontent}>S/W 품질 특성을 파악하여 </p>
                <p className={classes.datacontent}>
                  기능 테스트 및 성능 향상 스행
                </p>
              </div>
              <img src={woman2} alt="" className={classes.woman2} />
            </div>
          </div>
          <div className={classes.marginbox}></div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPage;
