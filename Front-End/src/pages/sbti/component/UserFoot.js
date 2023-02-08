import classes from './SbtiPage.module.css'

const UserFoot = (props) =>{

  return(
    <div className={classes.carouselItem}>
      <h1>Foot</h1>
      <form onChange={(event)=>{
        props.setData(event.target.value)
      }}
      onSubmit={(event)=> event.preventDefault()}
      >
        <input type="number" max='350'/>
      </form>
    </div>
  )
};

export default UserFoot;