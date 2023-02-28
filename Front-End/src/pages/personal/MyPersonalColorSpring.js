import { Fragment, useState } from "react";
// img
import Image1 from "../../assets/personal/springcolor.png";
import Image2 from "../../assets/personal/springlipstick.png";
import Image3 from "../../assets/personal/springclothes.png";
import Image4 from "../../assets/personal/springhair.png";
// css style
import classes from "./MyPersonalColorSpring.module.css";

const MyPersonalColorSpring = () => {
  const [rotate1, setRotate1] = useState(1);
  const [rotate2, setRotate2] = useState(2);
  const [rotate3, setRotate3] = useState(3);
  const [rotate4, setRotate4] = useState(4);

  const BackClickHandler = () => {
    setRotate1((prevState) => {
      return prevState - 1 === 0 ? 4 : prevState - 1;
    });
    setRotate2((prevState) => {
      return prevState - 1 === 0 ? 4 : prevState - 1;
    });
    setRotate3((prevState) => {
      return prevState - 1 === 0 ? 4 : prevState - 1;
    });
    setRotate4((prevState) => {
      return prevState - 1 === 0 ? 4 : prevState - 1;
    });
  };

  const PrevClickHandler = () => {
    setRotate1((prevState) => {
      return prevState + 1 === 5 ? 1 : prevState + 1;
    });
    setRotate2((prevState) => {
      return prevState + 1 === 5 ? 1 : prevState + 1;
    });
    setRotate3((prevState) => {
      return prevState + 1 === 5 ? 1 : prevState + 1;
    });
    setRotate4((prevState) => {
      return prevState + 1 === 5 ? 1 : prevState + 1;
    });
  };

  return (
    <Fragment>
      <div className={classes.background}>
        <div className={classes.words}>
          <h1 className={classes.h1}>당신의 퍼스널 컬러는 봄 웜톤</h1>
          <p className={classes.p}>
            당신에게 어울리는 컬러와 스타일을 추천드려요
          </p>
        </div>
        <main>
          <span
            className={`material-symbols-outlined ${classes.prev}`}
            onClick={PrevClickHandler}
          >
            arrow_back_ios
          </span>
          <div className={`${classes.rotate} ${classes[`on-${rotate1}`]}`}>
            <img src={Image1} alt="springcolor" />
            <div
              className={`${classes.phrases} ${
                rotate1 === 1 ? classes.on : ""
              }`}
            >
              <h3>당신의 컬러</h3>
              <p>‘반짝반짝’ 수식어가 잘 어울리는 당신은 봄 웜톤입니다!</p>
              <p>반짝거리고 윤기 있는 피부와 색조 표현이 중요합니다.</p>
              <br />
              <p>명랑한 봄 웜톤인 당신은 밝은 인상과 생동감 있는 컬러인</p>
              <p>활동적이고 귀여운 느낌이 어울리네요.</p>
            </div>
          </div>
          <div className={`${classes.rotate} ${classes[`on-${rotate2}`]}`}>
            <img src={Image2} alt="springcolor" />
            <div
              className={`${classes.phrases} ${
                rotate2 === 1 ? classes.on : ""
              }`}
            >
              <h3>립 컬러</h3>
              <p>밝고 생동감 있는 색조표현으로</p>
              <p>활동적이고 명랑한 인상을 연출해 보세요</p>
            </div>
          </div>
          <div className={`${classes.rotate} ${classes[`on-${rotate3}`]}`}>
            <img src={Image3} alt="springcolor" />
            <div
              className={`${classes.phrases} ${
                rotate3 === 1 ? classes.on : ""
              }`}
            >
              <h3>의상 컬러</h3>
              <p>명도와 채도가 높은 옷들이 잘 어울리는 당신!</p>
              <p>당신에게 이런 색상의 의상을 추천드려요</p>
            </div>
          </div>
          <div className={`${classes.rotate} ${classes[`on-${rotate4}`]}`}>
            <img src={Image4} alt="springcolor" />
            <div
              className={`${classes.phrases} ${
                rotate4 === 1 ? classes.on : ""
              }`}
            >
              <h3>헤어 컬러</h3>
              <p>흑갈색과 밝은 머리가 잘 어울리는 당신!</p>
              <p>오늘 미용실을 가보는 게 어떨까요?</p>
            </div>
          </div>
          <span
            className={`material-symbols-outlined ${classes.back}`}
            onClick={BackClickHandler}
          >
            arrow_forward_ios
          </span>
        </main>
      </div>
    </Fragment>
  );
};

export default MyPersonalColorSpring;
