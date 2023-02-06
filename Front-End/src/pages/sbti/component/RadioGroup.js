import classes from './RadioGroup.module.css'

const RadioGroup = ({label, children}) =>{
  return(
    <div className={classes.RadioGroup}>
      <fieldset>
        <legend>{label}</legend>
        {children}
      </fieldset>
    </div>
  )
}

export default RadioGroup;