import Spring from "../../../assets/spring_warm.png";
import Summer from "../../../assets/summer_cool.png";
import Fall from "../../../assets/fall_warm.png";
import Winter from "../../../assets/winter_cool.png";
import classes from "./PersonalColorPicker.module.css";

import { useState } from "react";

const PersonalColorPicker = (props) => {
  const [showSpring, setShowSpring] = useState(false);
  const [showSummer, setShowSummer] = useState(false);
  const [showFall, setShowFall] = useState(false);
  const [showWinter, setShowWinter] = useState(false);

  const showSpringHandler = () => {
    if (!showSpring) {
      setShowSummer(false);
      setShowFall(false);
      setShowWinter(false);
    }
    setShowSpring(!showSpring);
  };
  const showSummerHandler = () => {
    if (!showSummer) {
      setShowSpring(false);
      setShowFall(false);
      setShowWinter(false);
    }
    setShowSummer(!showSummer);
  };
  const showFallHandler = () => {
    if (!showFall) {
      setShowSpring(false);
      setShowSummer(false);
      setShowWinter(false);
    }
    setShowFall(!showFall);
  };
  const showWinterHandler = () => {
    if (!showWinter) {
      setShowSpring(false);
      setShowSummer(false);
      setShowFall(false);
    }
    setShowWinter(!showWinter);
  };

  return (
    <div className={classes.separation}>
      <div className={classes.seasons}>
        <div className={classes.spring} onClick={showSpringHandler}>
          봄
        </div>
        <div className={classes.summer} onClick={showSummerHandler}>
          여름
        </div>
        <div className={classes.fall} onClick={showFallHandler}>
          가을
        </div>
        <div className={classes.winter} onClick={showWinterHandler}>
          겨울
        </div>
      </div>
      <div className={classes["img-section"]}>
        {showSpring && <img src={Spring} alt="spring_warm" />}
        {showSummer && <img src={Summer} alt="summer_cool" />}
        {showFall && <img src={Fall} alt="fall_warm" />}
        {showWinter && <img src={Winter} alt="winter_warm" />}
      </div>
    </div>
  );
};

export default PersonalColorPicker;
