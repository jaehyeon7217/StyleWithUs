const InputLabel= ({label, errorMessage, ...rest}) => {
  return(
    <div>
      <label>
        <p>{label}</p>
        <input {...rest} />
      </label>
      <p>{errorMessage}</p>
    </div>
  )
}

export default InputLabel