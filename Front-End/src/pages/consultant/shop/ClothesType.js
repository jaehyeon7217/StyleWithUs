import { useRef } from "react";
import { useSelector } from "react-redux";

import classes from "./ClothesType.module.css";

// Slide Toggle 이벤트

const ClothesType = (props) => {
  // 타입, 카테고리, 디테일 항목들을 리덕스에서 가져온다.
  const category = useSelector((state) => state.cart.category);
  const type = props.type;
  const details = Object.keys(category[type]);

  const detailRef = useRef();

  // 카테고리 옆에 추가할 내용들
  const typeEnglish = {
    상의: "Top",
    아우터: "Outer",
    바지: "Pants",
    신발: "Shoes",
  };

  // props한 토글 상태를 저장한다.
  const toggle = props.toggleData;

  // 클릭을 하면 toggle을 on, off시키는 함수
  const onClickHandler = () => {
    if (toggle === true) {
      props.onToggle("");
      heightAnimation();
    } else {
      props.onToggle(type);
    }
  };

  const heightAnimation = () => {
    if (toggle === true) {
      console.log(1);
      detailRef.clientHeight = 0;
    } else {
      // detailRef.clientHeight = auto;
    }
  };

  return (
    <div onClick={onClickHandler}>
      <h3 className={classes.font}>
        {type} <span>{typeEnglish[type]}</span>
        <span
          className={`${classes.toggleButton1} ${toggle ? classes.off : ""}`}
        ></span>
        <span
          className={`${classes.toggleButton2} ${toggle ? classes.off : ""}`}
        ></span>
      </h3>
      <div
        className={`${classes.details} ${toggle ? classes.off : ""}`}
        ref={detailRef}
      >
        {details.map((detail) => {
          return <p key={detail}>{detail}</p>;
        })}
      </div>
    </div>
  );
};

export default ClothesType;
