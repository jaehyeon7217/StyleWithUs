const RadioGroup = ({label, children}) =>{
  return(
    <fieldset>
      <legend>{label}</legend>
      {children}
    </fieldset>
  )
}

export default RadioGroup;