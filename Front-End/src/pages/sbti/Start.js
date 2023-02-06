import BlackLogo from '../../assets/blackLogo.png'

import classes from './SbtiPage.module.css'

const Start = (props) => {
  return(
    <div className={classes.carouselItem}>
      <img src={BlackLogo} alt="" />
      <br />
      <button onClick={(event)=> props.setData(event)}>검사 시작하기</button>
    </div>
  )
}

export default Start;