const Radio = ({value, name, defaultChecked, disabled, children }) =>{
  return(
    <label htmlFor="">
      <input 
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      {children}
    </label>
  )
}

export default Radio;