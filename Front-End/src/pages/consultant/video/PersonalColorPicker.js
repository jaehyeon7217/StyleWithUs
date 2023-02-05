import Spring from "../../../assets/spring_warm.png";
import Summer from "../../../assets/summer_cool.png";
import Fall from "../../../assets/fall_warm.png";
import Winter from "../../../assets/winter_cool.png";

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
    <div onMouseEnter={props.mouseEnter}>
      <div>
        <span
          onMouseEnter={springMouseEnterHandler}
          onMouseLeave={springMouseLeaveHandler}
        >
          <span>봄</span>
          {hoverSpring && <img src={Spring} alt="spring_warm" />}
        </span>
        <span
          onMouseEnter={summerMouseEnterHandler}
          onMouseLeave={summerMouseLeaveHandler}
        >
          <span>여름</span>
          {hoverSummer && <img src={Summer} alt="summer_cool" />}
        </span>
        <span
          onMouseEnter={fallMouseEnterHandler}
          onMouseLeave={fallMouseLeaveHandler}
        >
          <span>가을</span>
          {hoverFall && <img src={Fall} alt="fall_warm" />}
        </span>
        <span
          onMouseEnter={winterMouseEnterHandler}
          onMouseLeave={winterMouseLeaveHandler}
        >
          <span>겨울</span>
          {hoverWinter && <img src={Winter} alt="winter_warm" />}
        </span>
      </div>
    </div>
  );
};

export default PersonalColorPicker;
