import classes from "./InputShortLabel.module.css"

const InputShortLabel= ({label, errorMessage, buttonName, onClick, ...rest}) => {
    

    return(
      <div className={classes.InputShortLabel}>
        <label>
          <p>{label}</p>
          <input {...rest} />
          <button onClick={onClick}>{buttonName}</button>
        </label>
        <p className={classes.ErrorMessage}>{errorMessage}</p>
      </div>
    )
  }
  
  export default InputShortLabel