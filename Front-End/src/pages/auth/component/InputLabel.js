import classes from "./InputLabel.module.css"

const InputLabel= ({label, errorMessage, ...rest}) => {
  return(
    <div className={classes.InputLabel}>
      <label>
        <p>{label}</p>
        <input {...rest} />
      </label>
      <p className={classes.ErrorMessage}>{errorMessage}</p>
    </div>
  )
}

export default InputLabel