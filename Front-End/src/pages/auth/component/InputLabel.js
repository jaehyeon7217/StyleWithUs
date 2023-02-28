import classes from "./InputLabel.module.css";

const InputLabel = ({ label, errorMessage, ...rest }) => {
  return (
    <div className={classes.InputLabel}>
      <label>
        <p>{label}</p>
        <input {...rest} />
      </label>
      <p
        className={
          errorMessage ? classes.ErrorMessage : classes.ErrorMessagehidden
        }
      >
        {" "}
        {errorMessage ? errorMessage : "qqq"}
      </p>
    </div>
  );
};

export default InputLabel;
