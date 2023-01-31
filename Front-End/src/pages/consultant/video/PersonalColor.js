import colorCircle from "../../../assets/colorcircle.png";
import classes from "./PersonalColor.module.css";

const PersonalColor = () => {
  return (
    <div>
      <img className={classes["color-circle"]} src={colorCircle} alt="colorCircle" />
    </div>
  );
};

export default PersonalColor;
