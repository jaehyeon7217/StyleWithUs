import BlackLogo from '../../../assets/blackLogo.png'

import classes from './SbtiPage.module.css'

const End = (props) => {
  return(
    <div className={classes.carouselItem}>
      <img src={BlackLogo} alt="" />
      <br />
      <button onClick={(event)=> props.setData(event)}>검사 제출</button>
    </div>
  )
}

export default End;