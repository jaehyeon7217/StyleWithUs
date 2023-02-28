import classes from "./Radio.module.css";

const Radio = ({ value, name, defaultChecked, disabled, num }) => {
  return (
    <label className={classes.inputLabel}>
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className={`${classes["input"]} ${classes[num]}`}
      />
    </label>
  );
};

export default Radio;
