import { Fragment } from "react";

import ButtonBox from "./ButtonBox";
import classes from "../Home/Home.module.css"

const Home = () =>{

  const onClickHandler = () => {
    document.querySelector(`.${classes['section'+3]}`).scrollIntoView({behavior: "smooth", block: "center"});
  };

  const TopMoveHandler = () => {
    document.querySelector(`.${classes['section'+1]}`).scrollIntoView({behavior: "smooth", block: "center"});
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