import { Fragment, useState } from "react";

import colorCircle from "../../../assets/colorcircle.png";
import classes from "./PersonalColor.module.css";

import PersonalColorPicker from "./PersonalColorPicker";

const PersonalColor = () => {
  const [pickerStatus, setPickerStatus] = useState(false);
  const personalColorPickerClickHandler = () => {
    setPickerStatus(!pickerStatus);
  };

  return (
    <Fragment>
      <div className={classes["color-picker"]}>
        <img
          className={classes["image-color-picker"]}
          src={colorCircle}
          alt="colorCircle"
          onClick={personalColorPickerClickHandler}
        />
      {pickerStatus && (
        <PersonalColorPicker />
      )}
      </div>
    </Fragment>
  );
};

export default PersonalColor;
