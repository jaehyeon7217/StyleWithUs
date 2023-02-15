import { Fragment, useState } from "react";

import classes from "./MyPersonalColorWinter.module.css";
import Image1 from "../../assets/personal/wintercolor.png"
import Image2 from "../../assets/personal/winterlipstick.png"
import Image3 from "../../assets/personal/winterclothes.png"
import Image4 from "../../assets/personal/winterhair.png"

const MyPersonalColorWinter = () => {
  const [rotate1, setRotate1] = useState(1);
  const [rotate2, setRotate2] = useState(2);
  const [rotate3, setRotate3] = useState(3);
  const [rotate4, setRotate4] = useState(4);


  const BackClickHandler = () => {
    setRotate1(prevState => {
      return prevState - 1 === 0 ? 4 : prevState - 1;
    })
    setRotate2(prevState => {
      return prevState - 1 === 0 ? 4 : prevState - 1;
    })
    setRotate3(prevState => {
      return prevState - 1 === 0 ? 4 : prevState - 1;
    })
    setRotate4(prevState => {
      return prevState - 1 === 0 ? 4 : prevState - 1;
    })
  }

  const PrevClickHandler = () => {
    setRotate1(prevState => {
      return prevState + 1 === 5 ? 1 : prevState + 1;
    })
    setRotate2(prevState => {
      return prevState + 1 === 5 ? 1 : prevState + 1;
    })
    setRotate3(prevState => {
      return prevState + 1 === 5 ? 1 : prevState + 1;
    })
    setRotate4(prevState => {
      return prevState + 1 === 5 ? 1 : prevState + 1;
    })
  };

  return (
    <Fragment>
      <div className={classes.background}>
        <div className={classes.words}>
          <h1 className={classes.h1}>당신의 퍼스널 컬러는 겨울 쿨톤</h1>
          <p className={classes.p}>당신에게 어울리는 컬러와 스타일을 추천드려요</p>
        </div>
        <main>
          <span className={`material-symbols-outlined ${classes.prev}`} onClick={PrevClickHandler}>arrow_back_ios</span>
          <div className={`${classes.rotate} ${classes[`on-${rotate1}`]}`}>
            <img src={Image1} alt="springcolor" />
            <div className={`${classes.phrases} ${rotate1 === 1? classes.on : ""}`}>
              <h3>당신의 컬러</h3>
              <p>‘시크하고 도도한’ 수식어가 잘 어울리는 당신은 겨울 쿨톤입니다!</p>
              <p>밝은 톤으로 창백하고 어두운 컬러들로 이루어져 있네요</p>
              <br/>
              <p>색상 자체는 절재하여 포인트 배색으로 카리스마를 더하고</p>
              <p>실버를 기준으로 선명하고 도도한 이미지를 시도해 보세요</p>
            </div>
          </div>
          <div className={`${classes.rotate} ${classes[`on-${rotate2}`]}`}>
            <img src={Image2} alt="springcolor" />
            <div className={`${classes.phrases} ${rotate2 === 1? classes.on : ""}`}>
              <h3>립 컬러</h3>
              <p>시크하고 절제 있는 색조표현으로</p>
              <p>도도하고 카리스마 있는 인상을 연출해 보세요</p>
            </div>
          </div>
          <div className={`${classes.rotate} ${classes[`on-${rotate3}`]}`}>
            <img src={Image3} alt="springcolor" />
            <div className={`${classes.phrases} ${rotate3 === 1? classes.on : ""}`}>
              <h3>의상 컬러</h3>
              <p>코발트블루와 검정 색상이 잘 어울리는 당신!</p>
              <p>당신에게 이런 색상의 의상을 추천드려요</p>
            </div>
          </div>
          <div className={`${classes.rotate} ${classes[`on-${rotate4}`]}`}>
            <img src={Image4} alt="springcolor" />
            <div className={`${classes.phrases} ${rotate4 === 1? classes.on : ""}`}>
              <h3>헤어 컬러</h3>
              <p>검정 계열 머리가 잘 어울리는 당신!</p>
              <p>오늘 미용실을 가보는 게 어떨까요?</p>
            </div>
          </div>
          <span className={`material-symbols-outlined ${classes.back}`} onClick={BackClickHandler}>arrow_forward_ios</span>
        </main>
      </div>
    </Fragment>
  );
};

export default MyPersonalColorWinter;