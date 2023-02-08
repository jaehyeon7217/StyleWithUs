import classes from './SbtiPage.module.css'

const UserHeight = (props) =>{

  return(
    <div className={classes.carouselItem}>
      <h1>Height</h1>
      <form onChange={(event)=>{
        props.setData(event.target.value)
      }}
      onSubmit={(event)=> event.preventDefault()}
      >
        <input type="number" max='200'/>
      </form>
    </div>
  )
};

export default UserHeight;