import classes from "./Radio.module.css"

const Radio = ({value, name, defaultChecked, disabled, children }) =>{
  return(
    <label className={classes.inputLabel}>
      <input 
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
    </label>
  )
}

export default Radio;