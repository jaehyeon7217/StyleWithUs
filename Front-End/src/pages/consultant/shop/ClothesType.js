import { Fragment } from "react";
import { useSelector } from "react-redux";

import classes from "./ClothesType.module.css";
import ClothesDetail from "./ClothesDetail";

// Slide Toggle 이벤트

const ClothesType = (props) => {
  // 타입, 카테고리, 디테일 항목들을 리덕스에서 가져온다.
  const userGender = useSelector(state => state.auth.userData.userGender);
  const gender = userGender ? "men" : "women";

  const category = useSelector((state) => state.shop.category[gender]);
  const type = props.type;
  const details = Object.keys(category[type]);

  // 카테고리 옆에 추가할 내용들
  const typeEnglish = {
    'men': {
      상의: "Top",
      아우터: "Outer",
      바지: "Pants",
      신발: "Shoes",
    },
    'women': {
      상의: "Top",
      하의: "Pants",
      신발: "Shoes",
      가방: "Bag",
      액세서리: "Accessory",
    }
  };

  // props한 토글 상태를 저장한다.
  const toggle = props.toggleData;

  // 클릭을 하면 toggle을 on, off시키는 함수
  const onClickHandler = () => {
    if (toggle === true) {
      // 토글이 켜져 있을 때 토글을 제거 한다.
      props.onToggle("");
      heightAnimation();
    } else {
      // 토글이 꺼져 있을 때 토글을 켠다.
      props.onToggle(type);
      heightAnimation();
    }
  };

  const heightAnimation = () => {
    const container = document.getElementById(type);

    if (toggle === false) {
      container.style.height = "auto";
      const height = `${container.clientHeight}px`;
      container.style.height = "0px";
      setTimeout(function () {
        container.style.height = height;
      }, 0);
    } else {
      container.style.height = "0px";
    }
  };

  return (
    <Fragment>
      <h3 className={classes.font} onClick={onClickHandler}>
        {type} <span>{typeEnglish[gender][type]}</span>
        <span
          className={`${classes.toggleButton1} ${toggle ? classes.off : ""}`}
        ></span>
        <span
          className={`${classes.toggleButton2} ${toggle ? classes.off : ""}`}
        ></span>
      </h3>
      <div
        id={type}
        className={`${classes.details} ${!toggle ? classes.off : ""}`}
      >
        {details.map((detail) => {
          return (
            <ClothesDetail
              key={detail}
              detail={detail}
              type={type}
              detailShop={props.detailShop}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default ClothesType;
