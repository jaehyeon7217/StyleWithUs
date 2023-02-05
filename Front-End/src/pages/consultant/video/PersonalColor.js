import { useState } from "react";

import colorCircle from "../../../assets/colorcircle.png";
import classes from "./PersonalColor.module.css";

import PersonalColorPicker from "./PersonalColorPicker";

const PersonalColor = () => {
  const [pickerStatus, setPickerStatus] = useState(false);
  const personalColorPickerClickHandler = () => {
    setPickerStatus(!pickerStatus);
  };
  const personalColorPickerMouseEnterHandler = () => {
    setPickerStatus(true);
  };
  const personalColorPickerMouseOutHandler = () => {
    setPickerStatus(false);
  };

  return (
    // <div className={classes["color-picker-container"]}>
    <div>
      <div
        onMouseEnter={personalColorPickerMouseEnterHandler}
        onMouseLeave={personalColorPickerMouseOutHandler}
      >
        <img
          className={classes["color-picker"]}
          src={colorCircle}
          alt="colorCircle"
          onClick={personalColorPickerClickHandler}
        />
      </div>
      {pickerStatus && (
        <PersonalColorPicker
          mouseEnter={personalColorPickerMouseEnterHandler}
        />
      )}
    </div>
  );
};

export default PersonalColor;
