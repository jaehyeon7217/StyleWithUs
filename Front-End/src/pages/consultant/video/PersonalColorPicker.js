import Spring from "../../../assets/spring_warm.png";
import Summer from "../../../assets/summer_cool.png";
import Fall from "../../../assets/fall_warm.png";
import Winter from "../../../assets/winter_cool.png";
import classes from './PersonalColorPicker.module.css';

import { useState } from "react";

const PersonalColorPicker = (props) => {
  const [hoverSpring, setHoverSpring] = useState(false);
  const [hoverSummer, setHoverSummer] = useState(false);
  const [hoverFall, setHoverFall] = useState(false);
  const [hoverWinter, setHoverWinter] = useState(false);

  const springMouseEnterHandler = () => {
    setHoverSpring(true);
  };
  const springMouseLeaveHandler = () => {
    setHoverSpring(false);
  };
  const summerMouseEnterHandler = () => {
    setHoverSummer(true);
  };
  const summerMouseLeaveHandler = () => {
    setHoverSummer(false);
  };
  const fallMouseEnterHandler = () => {
    setHoverFall(true);
  };
  const fallMouseLeaveHandler = () => {
    setHoverFall(false);
  };
  const winterMouseEnterHandler = () => {
    setHoverWinter(true);
  };
  const winterMouseLeaveHandler = () => {
    setHoverWinter(false);
  };

  return (
    <div className={classes.seasons} onMouseEnter={props.mouseEnter}>
      {/* <div> */}
        <div
          onMouseEnter={springMouseEnterHandler}
          onMouseLeave={springMouseLeaveHandler}
        >
          <div>봄</div>
          {hoverSpring && <img src={Spring} alt="spring_warm" />}
        </div>
        <div
          onMouseEnter={summerMouseEnterHandler}
          onMouseLeave={summerMouseLeaveHandler}
        >
          <div>여름</div>
          {hoverSummer && <img src={Summer} alt="summer_cool" />}
        </div>
        <div
          onMouseEnter={fallMouseEnterHandler}
          onMouseLeave={fallMouseLeaveHandler}
        >
          <div>가을</div>
          {hoverFall && <img src={Fall} alt="fall_warm" />}
        </div>
        <div
          onMouseEnter={winterMouseEnterHandler}
          onMouseLeave={winterMouseLeaveHandler}
        >
          <div>겨울</div>
          {hoverWinter && <img src={Winter} alt="winter_warm" />}
        </div>
      {/* </div> */}
    </div>
  );
};

export default PersonalColorPicker;
