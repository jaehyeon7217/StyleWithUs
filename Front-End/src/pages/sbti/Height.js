import classes from './SbtiPage.module.css'

const Height = (props) =>{
  const top = 'height';
  
  return(
    <div className={classes.carouselItem}>
      <h1>{top}</h1>
      <form onSubmit={(event)=>{
        event.preventDefault();
        props.setData(event.target.value)
      }}></form>
    </div>
  )
};

export default Height;