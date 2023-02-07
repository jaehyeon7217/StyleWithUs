import { Fragment } from "react";

import ButtonBox from "./ButtonBox";
import classes from "../Home/Home.module.css"

const Home = () =>{
  let lastScrollY = 0;
  window.addEventListener("mousewheel", event => {
    const scrollY = window.scrollY;
    // 이전의 스크롤 위치와 비교하기
    const direction = scrollY > lastScrollY ? true : false;
    // 현재의 스크롤 값을 저장
    lastScrollY = scrollY;
    console.log(direction);
  });

  const onClickHandler = () => {
    document.querySelector(`.${classes['section'+3]}`).scrollIntoView({behavior: "smooth", block: "center"});
  };

  const TopMoveHandler = () => {
    document.querySelector(`#App`).scrollIntoView({behavior: "smooth", block: "start"});
  }

  return (
    <Fragment>
      <ButtonBox />
      <div className={classes['section1']}>
        <h1>Style<br/>With<br/>Us</h1>
        <button onClick={onClickHandler}>이동</button>
      </div>
      <div className={classes['section2']}>
        <h1>Style<br/>With<br/>Us</h1>
      </div>
      <div className={classes['section3']}>
        <h1>Style<br/>With<br/>Us</h1>
      </div>
      <div className={classes['section4']}>
        <h1>Style<br/>With<br/>Us</h1>
      </div>
      <button className={classes.top} onClick={TopMoveHandler}>위로이동</button>
    </Fragment>
  );
}

export default Home